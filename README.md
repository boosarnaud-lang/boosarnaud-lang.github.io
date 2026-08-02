# boosarnaud-lang.github.io

Personal portfolio site — React app deployed to GitHub Pages.

## Structure

```
├── portfolio-react/       # React source code (Vite)
│   ├── src/
│   │   ├── data/          # Single source of truth
│   │   │   ├── portfolio.js    # All content (bilingual EN/FR)
│   │   │   └── translations.js # UI labels (bilingual)
│   │   ├── context/
│   │   │   └── LanguageContext.jsx  # EN/FR language switcher
│   │   ├── sections/      # One file per section
│   │   │   ├── Hero.jsx + .css
│   │   │   ├── Experience.jsx + .css
│   │   │   ├── Skills.jsx + .css
│   │   │   ├── DomainExpertise.jsx + .css
│   │   │   ├── GetToKnowMe.jsx + .css
│   │   │   ├── Projects.jsx + .css
│   │   │   └── Education.jsx + .css
│   │   ├── components/
│   │   │   └── Nav.jsx + .css
│   │   ├── utils/
│   │   │   └── generateCV.js  # PDF CV generator (jsPDF)
│   │   ├── App.jsx + .css
│   │   └── main.jsx
│   └── vite.config.js
├── docs/                  # Built output (served by GitHub Pages)
└── README.md
```

## Features

- **Bilingual** — EN/FR toggle in nav, all content switches
- **Interactive Skills** — SQL console with clickable tables
- **Live Duolingo stats** — Japanese streak & XP fetched in real-time
- **Exploded car view** — SVG BMW 3 Series in Domain Expertise section
- **Day timeline** — Live clock showing current activity (weekday/weekend modes)
- **Dynamic data** — Age, years of experience, dog age, marriage duration auto-update
- **PDF CV download** — Generated client-side with dark green theme (jsPDF)
- **Responsive** — Hamburger menu on mobile, fluid layouts
- **Unique section themes** — Each section has its own visual universe

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

## Editing content

All content lives in `src/data/portfolio.js`. Edit this single file to update:
- Experience (titles, achievements, skills)
- Skills (SQL table data)
- Domain Expertise (titles, descriptions)
- Projects
- Education

Changes automatically propagate to all sections AND the PDF CV.

UI labels (section titles, buttons, nav) live in `src/data/translations.js`.

## Tech

- React 19
- Vite 8
- jsPDF (client-side PDF generation)
- CSS (no framework — each section has its own theme)
- Google Fonts (Inter, JetBrains Mono)
