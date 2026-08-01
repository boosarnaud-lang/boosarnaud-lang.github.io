# boosarnaud-lang.github.io

Personal portfolio site — React app deployed to GitHub Pages.

## Structure

```
├── portfolio-react/       # React source code (Vite)
│   ├── src/
│   │   ├── sections/      # One file per section (edit here)
│   │   │   ├── Hero.jsx + .css
│   │   │   ├── Experience.jsx + .css
│   │   │   ├── Skills.jsx + .css
│   │   │   ├── DomainExpertise.jsx + .css
│   │   │   ├── Projects.jsx + .css
│   │   │   └── Education.jsx + .css
│   │   ├── components/    # Shared components
│   │   │   └── Nav.jsx + .css
│   │   ├── App.jsx        # Main layout
│   │   └── App.css        # Global styles
│   └── vite.config.js
├── docs/                  # Built output (served by GitHub Pages)
└── index.html             # Legacy (not used by Pages)
```

## Development

```bash
cd portfolio-react
npm install
npm run dev
```

Opens at `http://localhost:5173/`

## Deploy

```bash
cd portfolio-react
npm run build       # outputs to ../docs/
cd ..
git add docs/
git commit -m "deploy"
git push
```

GitHub Pages serves from the `docs/` folder on the `main` branch.

## Editing a section

Each section is self-contained in `portfolio-react/src/sections/`. Edit the `.jsx` for content/structure and the `.css` for styling. No other files need to change.

## Tech

- React 19
- Vite 8
- CSS (no framework — each section has its own theme)
- Google Fonts (Inter)
