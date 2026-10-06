# 🎬 CinePulse — The Ultra Cinema Experience & Movie Universe

A luxurious, high-fidelity movie discovery web application built with **React 19**, **Vite**, **React Router DOM (HashRouter)**, and **The Movie Database (TMDB) API** ([https://developer.themoviedb.org](https://developer.themoviedb.org/docs/getting-started)).

CinePulse is designed with dark-mode glassmorphic aesthetics, cinematic animations, interactive trailer modals, live TMDB API synchronization, and a reactive personal Watchlist system.

---

## 🌟 Key Features

### 1. 🎥 Cinematic Premiere Billboard (Hero Banner)
- **High-Impact 16:9 Backdrop**: Ultra-wide hero backdrop with multi-stage gradient masks and atmospheric lighting.
- **Dynamic Spotlight Carousel**: Cycles through top featured blockbusters with an interactive preview thumbnail strip and progress indicators.
- **Instant Actions**:
  - **▶ Watch Official Trailer**: Launches a high-definition YouTube trailer modal with audio and ESC/backdrop controls.
  - **＋ Add to Watchlist**: Instant toggle with audio feedback and confetti animation.
  - **ℹ Details**: Quick link to full cinematic archive page.

### 2. ⚡ The Movie Database (TMDB) Integration
- **Direct Live TMDB API v3 & v4**:
  - `GET /trending/movie/week`
  - `GET /movie/now_playing`
  - `GET /movie/popular`
  - `GET /movie/top_rated`
  - `GET /movie/upcoming`
  - `GET /search/movie` (instant debounced live search)
  - `GET /discover/movie` (multi-faceted genre & rating filtering)
  - `GET /movie/{id}` with `append_to_response=videos,credits,similar,recommendations`
- **Zero-Setup Showcase Database Fallback**:
  - Even without an API key, the website immediately renders a curated catalog of blockbusters (Dune: Part Two, Oppenheimer, Spider-Man: Across the Spider-Verse, Interstellar, The Dark Knight, Blade Runner 2049, etc.) with real TMDB posters, backdrops, cast photos, and YouTube trailers.
- **In-App API Key Manager Modal**:
  - Real-time connection testing (`validateApiKey`), status indicators (Live TMDB API vs Showcase Mode), and local storage persistence.

### 3. 🔍 Smart Filter & Search HUD
- **Category Switcher**: Trending, Now Playing, Top Rated, and Upcoming.
- **Genre Pills**: Instant filtering across Action, Sci-Fi, Drama, Adventure, Crime, Thriller, Animation, Comedy, Horror, Fantasy, and Mystery.
- **Quality Filters**: Filter by minimum rating (7.0+ Great, 8.0+ Masterpiece, 8.5+ Legendary) and sort by popularity, rating, or release date.
- **Instant Search**: Debounced search with auto-results counter and one-click filter reset.

### 4. 🍿 Personal Watchlist Management
- **Persistent Storage**: Saved in `localStorage` with real-time cross-component sync via custom events.
- **Binge Time Calculator**: Automatically computes total watch duration in hours and minutes.
- **Status Filtering**: Filter by "All", "Plan to Watch", and "Watched".
- **Celebration Effects**: Confetti bursts when marking films as watched!

### 5. ⚡ Command Palette & Global Search (Ctrl+K / /)
- **Instant Keyboard Navigation**: Hit `Ctrl+K` or `/` from anywhere to query the cinema catalogue.
- **Quick Links**: Jump straight to Trending, Top Rated, Now Playing, Upcoming, Watchlist, or spin the roulette wheel.

### 6. 🎲 Cinema Roulette ("Spin the Reel")
- **Indecision Buster**: Randomizes cinema choices with reel shuffling animation, sound effects, and confetti celebration for tonight's feature premiere.

### 7. 🔮 Mood Picker ("Pick by Mood")
- **Emotion-Driven Discovery**: Match your vibe ("I want to laugh", "Thrill me", "Blow my mind", "Make me feel", "Dark & gritty", "Masterpieces only") to the curated catalogue.

### 8. 👁️ Quick Look Preview Modal
- **Instant Preview**: View backdrop, runtime, genre badges, rating, and storyline summary with direct trailer and watchlist actions without losing scroll position.

### 9. 🎧 Web Audio API Synthesizer
- Built-in cinematic audio engine providing tactile feedback for trailer launches, watchlist additions, reel spins, and UI clicks (with a one-click mute toggle).

---

## 🛠 Tech Stack

- **Framework**: React 19 + React DOM
- **Bundler & Dev Server**: Vite 8
- **Routing**: React Router DOM 7 (`HashRouter` for GitHub Pages compatibility)
- **API**: The Movie Database (TMDB) API v3 / v4
- **Icons**: Lucide React
- **Confetti**: Canvas Confetti
- **Audio**: HTML5 Web Audio API

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Development Server
```bash
npm run dev
```

### 3. Production Build
```bash
npm run build
```

### 4. Optional: TMDB API Key
You can either:
1. Click the **Showcase Mode / TMDB API** badge in the top-right navbar to paste your free TMDB API key directly into the application.
2. Or create a `.env` file in the project root:
```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

---

## 📄 License & Attribution

This product uses the TMDB API but is not endorsed or certified by TMDB.
