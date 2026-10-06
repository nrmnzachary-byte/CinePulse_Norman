import { SHOWCASE_MOVIES } from '../src/config.js';

async function checkAndFix() {
  const badMovies = [];
  for (const m of SHOWCASE_MOVIES) {
    const posterUrl = 'https://image.tmdb.org/t/p/w500' + m.poster_path;
    try {
      const res = await fetch(posterUrl, { method: 'HEAD' });
      if (!res.ok) {
        badMovies.push({ id: m.id, title: m.title, current: m.poster_path, status: res.status });
      }
    } catch (e) {
      badMovies.push({ id: m.id, title: m.title, current: m.poster_path, error: e.message });
    }
  }

  console.log('Bad movies count:', badMovies.length);
  for (const bm of badMovies) {
    try {
      const res = await fetch(`https://www.themoviedb.org/movie/${bm.id}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml',
        }
      });
      if (res.ok) {
        const html = await res.text();
        const matches = [...html.matchAll(/property="og:image" content="([^"]+)"/g)];
        const posterMatch = matches.find(m => m[1].includes('/w500/')) || matches[0];
        const backdropMatch = matches.find(m => m[1].includes('/w780/') || m[1].includes('/w1280/'));
        console.log(`Movie ID ${bm.id} (${bm.title}):`);
        console.log('  New Poster:', posterMatch ? posterMatch[1] : 'none');
        console.log('  New Backdrop:', backdropMatch ? backdropMatch[1] : 'none');
      } else {
        console.log(`Failed to fetch page for ${bm.title} (${bm.id}): HTTP ${res.status}`);
      }
    } catch (err) {
      console.log(`Error fetching ${bm.title}:`, err.message);
    }
  }
}

checkAndFix();
