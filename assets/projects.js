// Les projets viennent tout seuls de Vercel (/api/projects) : un nouveau site
// ou un nouveau déploiement apparaît sur la page sans rien toucher ici.
// Numéro = ordre de création (N°001 = le plus ancien). Tri = dernier déploiement.
//
// Ce fichier ne sert qu'à enrichir ou masquer, par nom de projet Vercel :
//   desc     une phrase courte, concrète (remplace le dernier commit)
//   capture  chemin d'une capture 16:10 dans /captures
//   name     nom affiché, si différent du nom Vercel
//   hidden   true pour ne pas afficher le projet
window.PROJECT_OVERRIDES = {
  'hosto-mm': { desc: 'L’hôpital de la famille, sur deux sites : urgences, bloc opératoire, ordonnances, examens, messagerie patient-médecin et dossier complet à imprimer.' },
  'ewk': { desc: 'L’École du Weekend : Maël fait cours à Marin, deux jours par semaine. Emploi du temps, programme de maths par chapitres, appel et cantine au scanner, bulletins trimestriels.' },
  'credit-domestique': { desc: 'Une banque fictive pour toute la famille : comptes, cartes et virements, partagés en direct.' },
  'tractopolis-marin': { desc: 'Tractopolis, un jeu 3D dans le navigateur. Ferme, chantier, ville : tu conduis, tu descends, tu nages.' },
  'site-7e3': { desc: 'Le journal de la classe de 7e3 : ce qu’on a fait, semaine après semaine, avec projets et galerie.' },
  'site-28bis': { desc: 'Le site d’une maison de famille : galerie photo, journal et charte graphique.' },
  'studios-am': { desc: 'Les Studios A&M : production, cinéma, théâtre. Les films sortis et ceux en préparation.' },
  'agenda-college': { desc: 'Créno : l’emploi du temps de la semaine et les heures de trou, calculées toutes seules. Sans compte.' },
  'cocon-social': { desc: 'Cocon, le réseau social privé de la famille, sur invitation. Fil d’actu, photos et vidéos « Instants ».' },
  'marin-plantes': { desc: 'Marin plante et soigne une plante pour toi. Tu suis sa vie dans un journal et tu peux venir la voir.' },
  'sitedejojo': { desc: 'Le site de Jojo : ses photos et ses exploits.' },
  'guinguette-am': { desc: 'La Guinguette A&M : la carte, la commande suivie en direct, les réservations et l’écran cuisine.' },
  'maclasse-ea': { desc: 'Cahier de textes, emploi du temps et notes pour les classes de l’École Alsacienne. Non officiel.' },
  'ti-mael': { desc: 'Ti Maël, la crêperie aux volets bleus : la carte, la commande en ligne suivie en direct et la fidélité.' },
  'preau': { desc: 'Préau : l’espace numérique du collège et du lycée, une alternative à École Directe. Sans notes sur 20 ni classement.' },
  'memory-studio': { desc: 'Memory Studio : un questionnaire pour choisir ce qu’on garde en mémoire, puis le relire, le modifier ou l’effacer.' },
  'triathlon-marin': { desc: 'Le triathlon de Marin du 18 octobre : la course, et la liste des supporters qui viennent l’encourager.' },
  'projets-mael': { name: 'mael-moi', desc: 'Ce site : tous mes projets au même endroit, mis à jour tout seul à chaque déploiement.' },
};

// Liste de secours, affichée si l'API Vercel ne répond pas (relevée le 2026-10-06).
window.PROJECTS_FALLBACK = [
  { n: 1, name: 'guinguette-am', date: '2026-08', deployedAt: 1787649083499, url: 'https://guinguette-am.vercel.app' },
  { n: 2, name: 'maclasse-ea', date: '2026-08', deployedAt: 1787329207505, url: 'https://maclasse-ea.vercel.app' },
  { n: 3, name: 'studios-am', date: '2026-09', deployedAt: 1788957963379, url: 'https://studios-am.vercel.app' },
  { n: 4, name: 'marin-plantes', date: '2026-08', deployedAt: 1787838059080, url: 'https://marin-plantes.vercel.app' },
  { n: 5, name: 'credit-domestique', date: '2026-09', deployedAt: 1790521343377, url: 'https://credit-domestique.vercel.app' },
  { n: 6, name: 'cocon-social', date: '2026-08', deployedAt: 1788077617675, url: 'https://cocon-social.vercel.app' },
  { n: 7, name: 'sitedejojo', date: '2026-08', deployedAt: 1787833595917, url: 'https://sitedejojo.vercel.app' },
  { n: 8, name: 'tractopolis-marin', date: '2026-09', deployedAt: 1790516423319, url: 'https://tractopolis-marin.vercel.app' },
  { n: 9, name: 'site-7e3', date: '2026-09', deployedAt: 1789547795908, url: 'https://site-7e3.vercel.app' },
  { n: 10, name: 'site-28bis', date: '2026-09', deployedAt: 1788961529317, url: 'https://site-28bis.vercel.app' },
  { n: 11, name: 'agenda-college', date: '2026-09', deployedAt: 1788365126609, url: 'https://agenda-college.vercel.app' },
  { n: 12, name: 'ewk', date: '2026-10', deployedAt: 1791045125082, url: 'https://site-ewk.vercel.app' },
  { n: 18, name: 'triathlon-marin', date: '2026-10', deployedAt: 1792326554515, url: 'https://triathlon-marin.vercel.app' },
  { n: 17, name: 'memory-studio', date: '2026-10', deployedAt: 1792237069319, url: 'https://memory-studio-two.vercel.app', repo: null },
  { n: 16, name: 'preau', date: '2026-10', deployedAt: 1791881475398, url: 'https://logiciel-preau.vercel.app' },
  { n: 15, name: 'ti-mael', date: '2026-10', deployedAt: 1791440159541, url: 'https://ti-mael.vercel.app' },
  { n: 14, name: 'projets-mael', date: '2026-10', deployedAt: 1791269883937, url: 'https://mael-moi.vercel.app' },
  { n: 13, name: 'hosto-mm', date: '2026-10', deployedAt: 1791212822239, url: 'https://hosto-mm.vercel.app' },
];

(function () {
  const pad = (n) => String(n).padStart(3, '0');
  const host = (u) => u.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const month = (ms) => new Date(ms).toISOString().slice(0, 7);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  // Un déploiement raté laisse la version précédente en ligne : seul « en cours » change le statut.
  const STATUS = { BUILDING: 'Déploiement en cours', QUEUED: 'Déploiement en cours', INITIALIZING: 'Déploiement en cours' };

  // Les messages de merge automatiques ne disent rien du projet.
  const usefulCommit = (m) => m && !/^Merge (pull request|branch|remote)/i.test(m);

  function fromApi(projects) {
    const byAge = [...projects].sort((a, b) => a.createdAt - b.createdAt);
    return byAge.map((p, i) => ({
      n: i + 1,
      name: p.name,
      date: month(p.deployedAt),
      deployedAt: p.deployedAt,
      url: p.url,
      state: p.state,
      repo: p.repo,
      last: usefulCommit(p.last) ? p.last : null,
    }));
  }

  function card(p) {
    const capture = p.capture
      ? `<img src="${esc(p.capture)}" alt="Capture de ${esc(p.name)}" loading="lazy">`
      : 'capture';
    const text = p.desc || (p.last ? `Dernier changement : ${p.last}` : '');
    const status = STATUS[p.state] || 'En ligne';
    const tag = p.url ? `<span class="tag">${esc(host(p.url))}</span>` : '';
    return `<a class="card" href="${esc(p.url || '#')}" target="_blank" rel="noopener">
      <div class="capture">${capture}</div>
      <div class="card-body">
        <div class="card-meta"><span>N°${pad(p.n)} · ${esc(p.date)}</span><span class="status" data-state="${esc(p.state || 'READY')}">${status}</span></div>
        <div class="card-title">${esc(p.name)}</div>
        ${text ? `<div class="card-desc">${esc(text)}</div>` : ''}
        <div class="tags">${p.repo === null ? '' : '<span class="tag">GitHub</span>'}<span class="tag">Vercel</span>${tag}</div>
      </div>
    </a>`;
  }

  function row(p) {
    return `<a class="index-row" href="${esc(p.url || '#')}" target="_blank" rel="noopener">
      <span class="n">${pad(p.n)}</span><span class="name">${esc(p.name)}</span><span class="date">${esc(p.date)}</span><span class="arrow">↗</span>
    </a>`;
  }

  function render(list) {
    const shown = list
      .map((p) => ({ ...p, ...(window.PROJECT_OVERRIDES[p.name] || {}) }))
      .filter((p) => !p.hidden && p.url);
    const cards = document.getElementById('cards');
    const index = document.getElementById('index-list');
    const count = document.getElementById('count');
    if (cards) cards.innerHTML = shown.map(card).join('');
    if (index) index.innerHTML = shown.map(row).join('');
    if (count) count.textContent = `${shown.length} projets en ligne`;
  }

  fetch('/api/projects')
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then((data) => {
      if (!data.projects || !data.projects.length) throw new Error('liste vide');
      const list = fromApi(data.projects || []).sort((a, b) => b.deployedAt - a.deployedAt);
      render(list);
    })
    .catch(() => render([...window.PROJECTS_FALLBACK].sort((a, b) => b.deployedAt - a.deployedAt)));
})();
