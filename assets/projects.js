// Liste des projets — la seule chose à modifier pour ajouter un projet.
// Règles (voir /brand) : numéroter (N°001…), dater, noms simples, stack en mono.
//   n       numéro du projet
//   name    nom du projet (= nom Vercel)
//   date    AAAA-MM
//   url     adresse en ligne
//   repo    dépôt GitHub (owner/nom)
//   desc    une phrase courte, concrète (optionnel)
//   last    dernier changement publié, affiché si `desc` est vide
//   capture chemin d'une capture 16:10 dans /captures (optionnel)
window.PROJECTS = [
  { n: 14, name: 'hosto-mm', date: '2026-10', url: 'https://hosto-mm.vercel.app', repo: 'mael12854/hosto-mm',
    desc: 'Ordonnances : émission enregistrée et réimpression.' },
  { n: 13, name: 'ewk', date: '2026-10', url: 'https://site-ewk.vercel.app', repo: 'Cocon-famille/site-ewk',
    last: 'Retire la mention « pas de bulletin » de l’accueil.' },
  { n: 12, name: 'credit-domestique', date: '2026-09', url: 'https://credit-domestique.vercel.app', repo: 'Cocon-famille/Credit-Domestique',
    last: 'Documente le compte de Diane dans le README.' },
  { n: 11, name: 'tractopolis-marin', date: '2026-09', url: 'https://tractopolis-marin.vercel.app', repo: 'Cocon-famille/JeuDeMarin',
    last: 'Retire le toast « quelque chose brille » en double près de la boutique.' },
  { n: 10, name: 'site-7e3', date: '2026-09', url: 'https://site-7e3.vercel.app', repo: 'mael12854/site-7e3',
    last: 'Ajoute un formulaire d’avis à étoiles sur la page Contact.' },
  { n: 9, name: 'site-28bis', date: '2026-09', url: 'https://site-28bis.vercel.app', repo: 'mael12854/site-28bis',
    last: 'Corrige la mise en page mobile : la page défilait à l’horizontale.' },
  { n: 8, name: 'studios-am', date: '2026-09', url: 'https://studios-am.vercel.app', repo: 'mael12854/studios-am',
    last: 'Migration du site bêta.' },
  { n: 7, name: 'agenda-college', date: '2026-09', url: 'https://agenda-college.vercel.app', repo: 'mael12854/agenda-college',
    desc: 'La journée finit au dernier cours, pas à une heure fixe.' },
  { n: 6, name: 'cocon-social', date: '2026-08', url: 'https://cocon-social.vercel.app', repo: 'Cocon-famille/cocon-social',
    last: 'Message plus clair quand la connexion atteint la limite d’envoi des codes.' },
  { n: 5, name: 'marin-plantes', date: '2026-08', url: 'https://marin-plantes.vercel.app', repo: 'mael12854/marin-plantes',
    last: 'Corrige le direct qui s’arrêtait après la première photo.' },
  { n: 4, name: 'sitedejojo', date: '2026-08', url: 'https://sitedejojo.vercel.app', repo: 'mael12854/sitedejojo',
    last: 'Ajoute la feuille de style.' },
  { n: 3, name: 'guinguette-am', date: '2026-08', url: 'https://guinguette-am.vercel.app', repo: 'mael12854/guinguette-am',
    last: 'Fusion de la branche de dev.' },
];

(function () {
  const pad = (n) => String(n).padStart(3, '0');
  const host = (u) => u.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function card(p) {
    const capture = p.capture
      ? `<img src="${esc(p.capture)}" alt="Capture de ${esc(p.name)}" loading="lazy">`
      : 'capture';
    const text = p.desc || (p.last ? `Dernier changement : ${p.last}` : '');
    return `<a class="card" href="${esc(p.url)}" target="_blank" rel="noopener">
      <div class="capture">${capture}</div>
      <div class="card-body">
        <div class="card-meta"><span>N°${pad(p.n)} · ${esc(p.date)}</span><span class="status">En ligne</span></div>
        <div class="card-title">${esc(p.name)}</div>
        ${text ? `<div class="card-desc">${esc(text)}</div>` : ''}
        <div class="tags"><span class="tag">GitHub</span><span class="tag">Vercel</span><span class="tag">${esc(host(p.url))}</span></div>
      </div>
    </a>`;
  }

  function row(p) {
    return `<a class="index-row" href="${esc(p.url)}" target="_blank" rel="noopener">
      <span class="n">${pad(p.n)}</span><span class="name">${esc(p.name)}</span><span class="date">${esc(p.date)}</span><span class="arrow">↗</span>
    </a>`;
  }

  const list = [...window.PROJECTS].sort((a, b) => b.n - a.n);
  const cards = document.getElementById('cards');
  const index = document.getElementById('index-list');
  const count = document.getElementById('count');
  if (cards) cards.innerHTML = list.map(card).join('');
  if (index) index.innerHTML = list.map(row).join('');
  if (count) count.textContent = `${list.length} projets en ligne`;
})();
