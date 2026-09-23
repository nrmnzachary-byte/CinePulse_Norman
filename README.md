# ⚡ PokéDex Mini — Ultra Edition

A feature-packed, responsive PokéDex web application built with **React**, **Vite**, **React Router DOM (HashRouter)**, and the **PokéAPI**. Designed to fulfill all Week 6 curriculum milestones (90 pts) and provide extra WOW-factor features (100/100 pts) including an **interactive moving particle background**, **audio cries**, **all 1,025 Pokémon**, **shiny variants**, **generation filters**, and **GitHub Pages deployment**.

---

## 🌟 Features

### 1. Curriculum Compliance (90 Points Baseline)
- **Nested HashRouter Routing**:
  - `/` &rarr; `ListPage` (`SearchForm` + `PokemonList`)
  - `/pokemon/:name` &rarr; `DetailPage` (Detail page with artwork, types, stats, and back link)
  - `*` &rarr; `NotFoundPage` (404 state with "There's nothing here." and back link)
- **Centralized Config & Utilities**:
  - `src/config.js` (`API_BASE_URL`, `SPRITE_BASE_URL`)
  - `src/utils.js` (`getIdFromUrl`, `capitalize`, `getSpriteUrl`)
- **Shared Layout**:
  - `src/components/Layout.jsx` with header and `<Outlet />`
- **Race Condition Prevention**:
  - Uses `isCurrent` cancellation pattern in `useEffect` to avoid stale state.
- **Dynamic Browser Title**:
  - Automatically updates `document.title` to the loaded Pokémon's name and ID.
- **Input Validation**:
  - Validates empty submissions ("Type a Pokémon name first.") and normalizes inputs to lowercase.

### 2. "100/100 WOW Factor" Enhancements
- **Dynamic Interactive Moving Background**:
  - High-performance ambient canvas rendering floating translucent Pokéballs and glowing stardust particles with gentle cursor parallax.
- **All 1,025 Pokémon Across 9 Generations**:
  - Generation filter tabs: Gen I (Kanto) through Gen IX (Paldea), plus an "All Pokémon" view with smooth pagination ("Load More" & "Load All").
- **Elemental Type Filter**:
  - Filter by any of the 18 Pokémon elemental types with custom glowing neon type badges.
- **Authentic In-Game Audio Cries**:
  - Integrated with PokéAPI v2 sound cries (`cries.latest`). Click **🔊 Play Cry** to hear authentic Pokémon calls.
- **✨ Shiny Artwork Switcher**:
  - Toggle between default and shiny forms with celebratory sparkle particles (`canvas-confetti`).
- **Visual Stat Meters & Base Stat Total (BST)**:
  - Color-coded progress bars for HP, Attack, Defense, Sp. Atk, Sp. Def, and Speed, along with total BST calculation.
- **Artwork Display Modes**:
  - Switch between HD Official Artwork and classic pixel sprites on the list cards.
- **Trending Pokémon Pills**:
  - One-click instant search for popular Pokémon (Pikachu, Charizard, Gengar, Mewtwo, Lucario, Greninja, Eevee, Rayquaza).

---

## 📁 Project Structure

```
pokedex-mini/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── config.js
    ├── utils.js
    ├── index.css
    ├── components/
    │   ├── Layout.jsx
    │   ├── MovingBackground.jsx
    │   ├── PokemonList.jsx
    │   └── SearchForm.jsx
    └── pages/
        ├── ListPage.jsx
        ├── DetailPage.jsx
        └── NotFoundPage.jsx
```

---

## 🚀 Getting Started Locally

1. Open this folder in your terminal / IDE:
   ```bash
   cd pokedex-mini
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open the printed address in your browser: `http://localhost:5173/`

---

## 🚢 Deploying to GitHub Pages

As outlined in **Week 6 instructions (Page 24)**:

1. Create an empty repository named `pokedex-mini` on your GitHub account (do not initialize with README or gitignore).
2. Link your local project to your GitHub repository:
   ```bash
   git remote add origin https://github.com/<your-username>/pokedex-mini.git
   ```
3. Push your main branch:
   ```bash
   git add .
   git commit -m "Complete PokeDex Mini"
   git branch -M main
   git push -u origin main
   ```
4. Deploy the build to GitHub Pages:
   ```bash
   npm run deploy
   ```
   *(`predeploy` will automatically run `npm run build` into `dist/`, and `gh-pages` will push it to the `gh-pages` branch).*
5. On GitHub, go to **Settings &rarr; Pages**, ensure the source is set to **Deploy from a branch &rarr; `gh-pages` / `/ (root)`**, and click **Save**.
6. Visit your live site at:
   ```
   https://<your-username>.github.io/pokedex-mini/
   ```
