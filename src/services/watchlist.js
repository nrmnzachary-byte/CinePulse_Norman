import confetti from "canvas-confetti";
import { cinematicAudio } from "./soundEngine.js";

const WATCHLIST_STORAGE_KEY = "cinepulse_watchlist_v1";

// Custom event name for cross-component reactive sync
export const WATCHLIST_EVENT = "cinepulse_watchlist_changed";

export function getWatchlist() {
  try {
    const raw = localStorage.getItem(WATCHLIST_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveWatchlist(items) {
  try {
    localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent(WATCHLIST_EVENT, { detail: items }));
  } catch (e) {
    console.error("Failed to save watchlist:", e);
  }
}

export function isInWatchlist(movieId) {
  const list = getWatchlist();
  return list.some((item) => Number(item.id) === Number(movieId));
}

export function toggleWatchlist(movie) {
  const list = getWatchlist();
  const existingIdx = list.findIndex((item) => Number(item.id) === Number(movie.id));
  let updatedList;
  let added = false;

  if (existingIdx >= 0) {
    updatedList = list.filter((_, idx) => idx !== existingIdx);
    cinematicAudio.playWatchlistRemove();
  } else {
    const movieEntry = {
      id: movie.id,
      title: movie.title || movie.name,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      runtime: movie.runtime || 120,
      overview: movie.overview,
      genres: movie.genres || (movie.genre_ids ? [] : []),
      trailer_key: movie.trailer_key,
      watched: false,
      addedAt: new Date().toISOString(),
    };
    updatedList = [movieEntry, ...list];
    added = true;
    cinematicAudio.playWatchlistAdd();

    // Trigger subtle celebratory confetti burst
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#f59e0b", "#ef4444", "#3b82f6", "#ffffff"],
    });
  }

  saveWatchlist(updatedList);
  return { added, list: updatedList };
}

export function toggleWatchedStatus(movieId) {
  const list = getWatchlist();
  const updatedList = list.map((item) => {
    if (Number(item.id) === Number(movieId)) {
      const nextStatus = !item.watched;
      if (nextStatus) {
        confetti({
          particleCount: 75,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#10b981", "#f59e0b", "#6366f1"],
        });
      }
      return { ...item, watched: nextStatus };
    }
    return item;
  });
  saveWatchlist(updatedList);
  return updatedList;
}

export function removeFromWatchlist(movieId) {
  const list = getWatchlist();
  const updatedList = list.filter((item) => Number(item.id) !== Number(movieId));
  cinematicAudio.playWatchlistRemove();
  saveWatchlist(updatedList);
  return updatedList;
}

export function clearWatchlist() {
  saveWatchlist([]);
}
