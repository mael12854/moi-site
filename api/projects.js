// GET /api/projects — liste les projets Vercel de l'équipe, avec leur dernier
// déploiement de production. Le site s'en sert pour se mettre à jour tout seul
// dès qu'un projet est créé ou redéployé.
//
// Variables d'environnement (réglages du projet Vercel) :
//   VERCEL_TOKEN    jeton d'accès Vercel en lecture (obligatoire)
//   VERCEL_TEAM_ID  équipe à lister (par défaut : Projets de Maël)

const TEAM_ID = process.env.VERCEL_TEAM_ID || 'team_q8MFeSYeQl5UzaKzjcM72mGf';
const API = 'https://api.vercel.com';

async function api(token, path, params = {}) {
  const qs = new URLSearchParams({ teamId: TEAM_ID, ...params });
  const r = await fetch(`${API}${path}?${qs}`, { headers: { Authorization: `Bearer ${token}` } });
  if (!r.ok) throw new Error(`Vercel API ${r.status} sur ${path}`);
  return r.json();
}

// Parcourt les pages d'une liste Vercel (curseur `pagination.next`).
async function paginate(token, path, key, params, cursor, maxPages = 10) {
  const out = [];
  let next = null;
  for (let page = 0; page < maxPages; page++) {
    const body = await api(token, path, { limit: '100', ...params, ...(next ? { [cursor]: String(next) } : {}) });
    out.push(...(body[key] || []));
    next = body.pagination && body.pagination.next;
    if (!next) break;
  }
  return out;
}

// Dernier déploiement de production par projet (clé : id, sinon nom).
async function latestProductionDeploys(token) {
  const deploys = await paginate(token, '/v6/deployments', 'deployments', { target: 'production' }, 'until', 5);
  const latest = new Map();
  for (const d of deploys) {
    const key = d.projectId || d.name;
    const prev = latest.get(key);
    if (!prev || (d.created || d.createdAt) > (prev.created || prev.createdAt)) latest.set(key, d);
  }
  return latest;
}

// Domaine public : un domaine perso d'abord, puis <nom-du-projet>.vercel.app,
// sinon le plus court en .vercel.app.
function pickDomain(names, projectName) {
  const list = (names || []).filter((a) => typeof a === 'string');
  const custom = list.filter((a) => !a.endsWith('.vercel.app'));
  if (custom.length) return [...custom].sort((a, b) => a.length - b.length)[0];
  if (list.includes(`${projectName}.vercel.app`)) return `${projectName}.vercel.app`;
  return [...list].sort((a, b) => a.length - b.length)[0] || null;
}

async function productionDomain(token, project) {
  const fromTargets = project.targets && project.targets.production && project.targets.production.alias;
  if (fromTargets && fromTargets.length) return pickDomain(fromTargets, project.name);
  const body = await api(token, `/v9/projects/${encodeURIComponent(project.id)}/domains`);
  // Les domaines liés à une branche ou qui redirigent ne sont pas l'adresse publique.
  const names = (body.domains || []).filter((d) => !d.gitBranch && !d.redirect).map((d) => d.name);
  return pickDomain(names, project.name);
}

function toProject(p, deploy, domain) {
  if (!deploy) return null; // jamais déployé en production
  const meta = deploy.meta || {};
  const org = meta.githubOrg || (p.link && p.link.org);
  const repo = meta.githubRepo || (p.link && p.link.repo);
  return {
    id: p.id,
    name: p.name,
    createdAt: p.createdAt,
    deployedAt: deploy.created || deploy.createdAt || p.updatedAt,
    state: deploy.readyState || deploy.state || null,
    url: domain ? `https://${domain}` : null,
    repo: org && repo ? `${org}/${repo}` : null,
    last: (meta.githubCommitMessage || '').split('\n')[0].trim() || null,
  };
}

module.exports = async (req, res) => {
  const token = process.env.VERCEL_TOKEN;
  if (!token) {
    res.status(503).json({ error: 'VERCEL_TOKEN manquant' });
    return;
  }
  try {
    const [all, deploys] = await Promise.all([
      paginate(token, '/v10/projects', 'projects', {}, 'from'),
      latestProductionDeploys(token),
    ]);
    const projects = await Promise.all(
      all.map(async (p) => {
        const deploy = (p.targets && p.targets.production) || deploys.get(p.id) || deploys.get(p.name);
        if (!deploy) return null;
        const domain = await productionDomain(token, p).catch(() => null);
        return toProject(p, deploy, domain);
      })
    );
    const list = projects.filter(Boolean);
    // Cache CDN : une minute frais, puis resservi pendant la mise à jour.
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=600');
    if ('debug' in (req.query || {})) {
      res.status(200).json({ team: TEAM_ID, listed: all.length, deploys: deploys.size, shown: list.length });
      return;
    }
    res.status(200).json({ projects: list });
  } catch (e) {
    res.status(502).json({ error: String(e.message || e) });
  }
};
