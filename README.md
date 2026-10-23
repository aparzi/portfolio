# Angelo Parziale — portfolio

Portfolio personale in Angular 21 (standalone components, signals), bilingue EN/IT con inglese di default. Deploy automatico su GitHub Pages.

## Sviluppo

```bash
npm install
npm start        # http://localhost:4200
npm run build    # output in dist/angelo-portfolio/browser
```

## Deploy su GitHub Pages

1. Crea un repository su GitHub (es. `angelo-portfolio`, oppure `aparzi.github.io` per averlo sulla root del dominio).
2. Push del codice:
   ```bash
   git init
   git add .
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin git@github.com:aparzi/<repo>.git
   git push -u origin main
   ```
3. Su GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Il workflow `.github/workflows/deploy.yml` parte a ogni push su `main`, calcola da solo il `base-href` (`/` per `<user>.github.io`, `/<repo>/` altrimenti), aggiunge il fallback `404.html` e pubblica.

Il sito sarà su `https://aparzi.github.io/<repo>/` (o `https://aparzi.github.io/`).

## Contenuti

Tutti i testi, in entrambe le lingue, sono in `src/app/data/profile.ts` (oggetti `en` e `it`): esperienze, progetti, skill, formazione, link, statistiche e le tre menzioni. I link delle menzioni sono in `profile.links`.

## Effetti

- `components/particles` — canvas di punti collegati che seguono il puntatore, fuori da NgZone.
- `components/count-up` — contatori animati quando entrano in viewport.
- `directives/reveal.directive` — `appReveal` (con ritardo opzionale in ms) per il reveal allo scroll via IntersectionObserver.
- `directives/tilt.directive` — `appTilt` per il tilt 3D e lo spotlight sulle card.

Tutte le animazioni rispettano `prefers-reduced-motion`.
