// Les projets viennent tout seuls de Vercel (/api/projects) : un nouveau site
// ou un nouveau déploiement apparaît sur la page sans rien toucher ici.
// Numéro = ordre de création (N°001 = le plus ancien). Tri = dernier déploiement.
//
// Ce fichier ne sert qu'à enrichir ou masquer, par nom de projet Vercel :
//   desc     une phrase courte, concrète (remplace le dernier commit)
//   capture  chemin d'une capture 16:10 dans /captures
//   hidden   true pour ne pas afficher le projet
window.PROJECT_OVERRIDES = {
  'hosto-mm': { desc: 'Ordonnances : émission enregistrée et réimpression.' },
  'agenda-college': { desc: 'La journée finit au dernier cours, pas à une heure fixe.' },
  'projets-mael': { hidden: true }, // ce site
};

// Liste de secours, affichée si l'API Vercel ne répond pas.
window.PROJECTS_FALLBACK = [
  { n: 14, name: 'hosto-mm', date: '2026-10', url: 'https://hosto-mm.vercel.app' },
  { n: 13, name: 'ewk', date: '2026-10', url: 'https://site-ewk.vercel.app', last: 'Retire la mention « pas de bulletin » de l’accueil.' },
  { n: 12, name: 'credit-domestique', date: '2026-09', url: 'https://credit-domestique.vercel.app', last: 'Documente le compte de Diane dans le README.' },
  { n: 11, name: 'tractopolis-marin', date: '2026-09', url: 'https://tractopolis-marin.vercel.app', last: 'Retire le toast « quelque chose brille » en double près de la boutique.' },
  { n: 10, name: 'site-7e3', date: '2026-09', url: 'https://site-7e3.vercel.app', last: 'Ajoute un formulaire d’avis à étoiles sur la page Contact.' },
  { n: 9, name: 'site-28bis', date: '2026-09', url: 'https://site-28bis.vercel.app', last: 'Corrige la mise en page mobile : la page défilait à l’horizontale.' },
  { n: 8, name: 'studios-am', date: '2026-09', url: 'https://studios-am.vercel.app' },
  { n: 7, name: 'agenda-college', date: '2026-09', url: 'https://agenda-college.vercel.app' },
  { n: 6, name: 'cocon-social', date: '2026-08', url: 'https://cocon-social.vercel.app', last: 'Message plus clair quand la connexion atteint la limite d’envoi des codes.' },
  { n: 5, name: 'marin-plantes', date: '2026-08', url: 'https://marin-plantes.vercel.app', last: 'Corrige le direct qui s’arrêtait après la première photo.' },
  { n: 4, name: 'sitedejojo', date: '2026-08', url: 'https://sitedejojo.vercel.app', last: 'Ajoute la feuille de style.' },
  { n: 3, name: 'guinguette-am', date: '2026-08', url: 'https://guinguette-am.vercel.app' },
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
        <div class="tags"><span class="tag">GitHub</span><span class="tag">Vercel</span>${tag}</div>
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
      const list = fromApi(data.projects || []).sort((a, b) => b.deployedAt - a.deployedAt);
      render(list);
    })
    .catch(() => render([...window.PROJECTS_FALLBACK].sort((a, b) => b.n - a.n)));
})();
