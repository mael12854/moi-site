# moi.

Tous mes projets web, construits avec Claude Code.

Site statique (HTML/CSS, aucun build) + une fonction Vercel, déployable tel quel.

- `/` — accueil : cartes projets, index, « comment c'est fait »
- `/brand` — brand guidelines v1.0 (export Claude Design)

## Projets : automatiques

La page lit `/api/projects` (fonction Vercel, `api/projects.js`), qui liste les
projets de l'équipe Vercel et leur dernier déploiement de production. Un nouveau
site ou un nouveau déploiement apparaît donc tout seul (cache d'une minute).

- Numéro = ordre de création (N°001 = le plus ancien), tri = dernier déploiement.
- Texte de la carte = dernier commit, sauf si une `desc` est donnée.
- Pour une description, une capture ou masquer un projet : `PROJECT_OVERRIDES`
  dans `assets/projects.js`. Captures : image 16:10 (2× minimum) dans `captures/`.

Réglage requis (une fois) : variable d'environnement `VERCEL_TOKEN` dans le
projet Vercel (Settings → Environment Variables), avec un jeton créé dans
Vercel → Account Settings → Tokens, limité à l'équipe « Projets de Maël ».
Sans jeton, la page affiche la liste de secours `PROJECTS_FALLBACK`.

## Tokens

Papier `#F2EFE7` · Encre `#15130F` · Vermillon `#E8482B` · Graphite `#4A463F` · Pierre `#CFC9BC`
Instrument Serif (titres) · Geist (texte) · Geist Mono (labels, métadonnées)

Lancer en local : `python3 -m http.server` puis http://localhost:8000
