// GET /api/projects — liste les projets Vercel de l'équipe, avec leur dernier
// déploiement de production. Le site s'en sert pour se mettre à jour tout seul
// dès qu'un projet est créé ou redéployé.
//
// Variables d'environnement (réglages du projet Vercel) :
//   VERCEL_TOKEN    jeton d'accès Vercel en lecture (obligatoire)
//   VERCEL_TEAM_ID  équipe à lister (par défaut : Projets de Maël)

const TEAM_ID = process.env.VERCEL_TEAM_ID || 'team_q8MFeSYeQl5UzaKzjcM72mGf';
const API = 'https://api.vercel.com';

async function listProjects(token) {
  const projects = [];
  let from = null;
  for (let page = 0; page < 10; page++) {
    const qs = new URLSearchParams({ teamId: TEAM_ID, limit: '100' });
    if (from) qs.set('from', String(from));
    const r = await fetch(`${API}/v10/projects?${qs}`, { headers: { Authorization: `Bearer ${token}` } });
    if (!r.ok) throw new Error(`Vercel API ${r.status}`);
    const body = await r.json();
    projects.push(...(body.projects || []));
    from = body.pagination && body.pagination.next;
    if (!from) break;
  }
  return projects;
}

// Domaine public : un domaine perso d'abord, sinon le plus court en .vercel.app.
function pickDomain(aliases) {
  const list = (aliases || []).filter((a) => typeof a === 'string');
  const custom = list.filter((a) => !a.endsWith('.vercel.app'));
  const pool = custom.length ? custom : list;
  return pool.sort((a, b) => a.length - b.length)[0] || null;
}

function toProject(p) {
  const prod = (p.targets && p.targets.production) || null;
  if (!prod) return null; // jamais déployé en production
  const meta = prod.meta || {};
  const domain = pickDomain(prod.alias) || prod.url;
  const org = meta.githubOrg || (p.link && p.link.org);
  const repo = meta.githubRepo || (p.link && p.link.repo);
  return {
    id: p.id,
    name: p.name,
    createdAt: p.createdAt,
    deployedAt: prod.createdAt || p.updatedAt,
    state: prod.readyState || null,
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
    const self = process.env.VERCEL_PROJECT_ID;
    const projects = (await listProjects(token))
      .filter((p) => p.id !== self)
      .map(toProject)
      .filter(Boolean);
    // Cache CDN : une minute frais, puis resservi pendant la mise à jour.
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=600');
    res.status(200).json({ projects });
  } catch (e) {
    res.status(502).json({ error: String(e.message || e) });
  }
};

module.exports.toProject = toProject;
