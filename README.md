# LigaLive ⚽

A modern, static **football live-score** frontend — a cleaner, mobile-first blend of Sofascore, Flashscore, and FotMob. Built with **Nuxt 4 + TypeScript + Tailwind CSS v4**, dark-mode by default, fully responsive, and powered entirely by static dummy data (no backend).

## ✨ Features

- **4 pages**: Home, Live Score, League Detail, Match Detail
- **Dark mode default** with a persistent toggle (light mode included)
- **Sticky header** (logo · nav · search · notifications · theme toggle) + **mobile bottom navigation**
- **Component-based architecture** — ~26 reusable components, all auto-imported
- **Skeleton loading**, hover effects, smooth transitions, pulsing LIVE indicators
- **Match Detail**: event timeline, statistics with progress bars, visual lineup pitch, head-to-head, recent form
- **Standings & top scorers computed on the fly** from match results
- Static dummy data: **5 leagues · 20 teams · 100 matches · 50 players**

## 🚀 Getting started

Requires **Node.js 18+**.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:3000)
npm run dev
```

### Other scripts

```bash
npm run build      # production build (Node server)
npm run generate   # static site generation -> ./.output/public
npm run preview    # preview a production build
npm run typecheck  # vue-tsc type checking
```

To deploy as a fully static site, run `npm run generate` and host the contents of `.output/public/` anywhere (Netlify, Vercel, GitHub Pages, S3, etc.).

## 🗂 Project structure

```
app/
  assets/css/main.css      # Tailwind v4 + design system (theme tokens, components, animations)
  components/              # all UI components (auto-imported)
  composables/             # useData (data access) + useTheme (dark mode)
  data/                    # generated static JSON (leagues, teams, matches, players)
  layouts/default.vue      # header + footer + mobile nav shell
  pages/                   # index, livescore, league/[slug], match/[id]
  types/index.ts           # shared TypeScript types
  utils/format.ts          # pure formatting helpers
scripts/generate-data.mjs  # deterministic dummy-data generator
nuxt.config.ts
```

## 🎨 Design tokens

| Token       | Value     |
| ----------- | --------- |
| Primary     | `#22C55E` |
| Secondary   | `#0F172A` |
| Background  | `#020617` |
| Cards       | `#111827` |
| Text        | `#F8FAFC` |

LIVE status uses red (`#ef4444`) so it stands out against the green-accented UI; upcoming uses amber, finished uses slate.

## 🔄 Regenerating data

The dataset is deterministic (seeded). To regenerate:

```bash
node scripts/generate-data.mjs
```

## 📝 Notes

- All team crests and league logos are rendered as **color-aware monogram badges** — no external image assets, so the app stays fast and dependency-light.
- Icons are inline SVG (no icon library).
- Dates are anchored to a fixed reference date (2026-06-25) so "Today / Tomorrow" labels stay consistent with the static fixtures.
