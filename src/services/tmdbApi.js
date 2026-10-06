import {
  TMDB_BASE_URL,
  SHOWCASE_MOVIES,
  GENRE_MAP,
  MOVIE_VIBES,
  DECADES,
} from "../config.js";

const API_KEY_STORAGE = "tmdb_api_key";
const API_TOKEN_STORAGE = "tmdb_access_token";

// Retrieve configured API key or Bearer token
export function getStoredApiKey() {
  if (typeof window === "undefined") return "";
    return (
      localStorage.getItem(API_KEY_STORAGE) ||
      import.meta.env.VITE_TMDB_API_KEY ||
      "87c00bd1f64b0956a6e9bfd8cab37569"
    );
}

export function getStoredAccessToken() {
  if (typeof window === "undefined") return "";
  return (
    localStorage.getItem(API_TOKEN_STORAGE) ||
    import.meta.env.VITE_TMDB_ACCESS_TOKEN ||
    ""
  );
}

export function setStoredApiKey(key) {
  if (key) {
    localStorage.setItem(API_KEY_STORAGE, key.trim());
  } else {
    localStorage.removeItem(API_KEY_STORAGE);
  }
  window.dispatchEvent(new CustomEvent("tmdb_auth_changed"));
}

export function setStoredAccessToken(token) {
  if (token) {
    localStorage.setItem(API_TOKEN_STORAGE, token.trim());
  } else {
    localStorage.removeItem(API_TOKEN_STORAGE);
  }
  window.dispatchEvent(new CustomEvent("tmdb_auth_changed"));
}

export function hasApiKey() {
  return Boolean(getStoredApiKey() || getStoredAccessToken());
}

// Low-level fetch wrapper with auth header or api_key query param
async function tmdbFetch(endpoint, params = {}) {
  const apiKey = getStoredApiKey();
  const accessToken = getStoredAccessToken();

  if (!apiKey && !accessToken) {
    throw new Error("NO_API_KEY");
  }

  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);

  // If using standard API key
  if (apiKey) {
    url.searchParams.set("api_key", apiKey);
  }

  // Attach any query parameters
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== "") {
      url.searchParams.set(key, val);
    }
  });

  const headers = {
    Accept: "application/json",
  };

  // If using v4 Read Access Token
  if (accessToken && !apiKey) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(url.toString(), { headers });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(
      errorData.status_message || `TMDB API error ${response.status}`
    );
    error.status = response.status;
    throw error;
  }

  return response.json();
}

// Test key against TMDB API
export async function validateApiKey(keyCandidate) {
  const isBearer = keyCandidate.length > 50;
  const testUrl = `${TMDB_BASE_URL}/authentication`;
  const headers = { Accept: "application/json" };

  let urlWithKey = testUrl;
  if (isBearer) {
    headers.Authorization = `Bearer ${keyCandidate.trim()}`;
  } else {
    urlWithKey = `${testUrl}?api_key=${keyCandidate.trim()}`;
  }

  try {
    const res = await fetch(urlWithKey, { headers });
    const data = await res.json();
    return { success: res.ok && data.success === true, message: data.status_message || "Valid" };
  } catch (err) {
    return { success: false, message: err.message || "Network error" };
  }
}

// Enrich TMDB movie results with trailer key & normalized genres
function normalizeMovie(movie) {
  const genres =
    movie.genres ||
    (movie.genre_ids ? movie.genre_ids.map((id) => ({ id, name: GENRE_MAP[id] || "Cinema" })) : []);

  let trailerKey = movie.trailer_key;
  if (!trailerKey && movie.videos?.results) {
    const officialTrailer = movie.videos.results.find(
      (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
    );
    trailerKey = officialTrailer?.key;
  }

  return {
    ...movie,
    genres,
    trailer_key: trailerKey || "Way9Dexny3w",
    vote_average: Number(movie.vote_average ? movie.vote_average.toFixed(1) : 7.8),
  };
}

// Helper to paginate showcase movie results smoothly (12 movies per page)
function paginateLocalResults(list, page = 1, pageSize = 12) {
  const total = list.length;
  const total_pages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.max(1, Math.min(page, total_pages));
  const start = (currentPage - 1) * pageSize;
  const pageItems = list.slice(start, start + pageSize);

  return {
    results: pageItems.map(normalizeMovie),
    page: currentPage,
    total_pages,
    total_results: total,
    isLive: false,
  };
}

// ------------------------------------------------------------
// High-Level Data Methods (with Seamless Showcase Fallback)
// ------------------------------------------------------------

export async function getTrendingMovies(timeWindow = "week", page = 1) {
  try {
    if (hasApiKey()) {
      const data = await tmdbFetch(`/trending/movie/${timeWindow}`, { page });
      return {
        results: data.results.map(normalizeMovie),
        page: data.page,
        total_pages: data.total_pages,
        isLive: true,
      };
    }
  } catch (e) {
    console.warn("Live TMDB fetch failed, falling back to showcase:", e.message);
  }

  // Showcase fallback: sorted strictly by popularity descending
  const filtered = SHOWCASE_MOVIES.filter(
    (m) => (m.category && m.category.includes("trending")) || (m.popularity && m.popularity >= 600)
  ).sort((a, b) => (b.popularity || 0) - (a.popularity || 0));

  const list = filtered.length ? filtered : SHOWCASE_MOVIES;
  return paginateLocalResults(list, page, 12);
}

export async function getNowPlayingMovies(page = 1) {
  try {
    if (hasApiKey()) {
      const data = await tmdbFetch("/movie/now_playing", { page });
      return {
        results: data.results.map(normalizeMovie),
        page: data.page,
        total_pages: data.total_pages,
        isLive: true,
      };
    }
  } catch (e) {
    console.warn("Live TMDB fetch failed, falling back to showcase:", e.message);
  }

  const filtered = SHOWCASE_MOVIES.filter(
    (m) => m.category && m.category.includes("now_playing")
  ).sort((a, b) => new Date(b.release_date || 0) - new Date(a.release_date || 0));

  const list = filtered.length ? filtered : SHOWCASE_MOVIES;
  return paginateLocalResults(list, page, 12);
}

export async function getTopRatedMovies(page = 1) {
  try {
    if (hasApiKey()) {
      const data = await tmdbFetch("/movie/top_rated", { page });
      return {
        results: data.results.map(normalizeMovie),
        page: data.page,
        total_pages: data.total_pages,
        isLive: true,
      };
    }
  } catch (e) {
    console.warn("Live TMDB fetch failed, falling back to showcase:", e.message);
  }

  // Showcase fallback: strictly sorted descending by vote_average!
  const filtered = SHOWCASE_MOVIES.filter(
    (m) => (m.category && m.category.includes("top_rated")) || (m.vote_average && m.vote_average >= 8.5)
  ).sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));

  const list = filtered.length ? filtered : SHOWCASE_MOVIES;
  return paginateLocalResults(list, page, 12);
}

export async function getUpcomingMovies(page = 1) {
  try {
    if (hasApiKey()) {
      const data = await tmdbFetch("/movie/upcoming", { page });
      return {
        results: data.results.map(normalizeMovie),
        page: data.page,
        total_pages: data.total_pages,
        isLive: true,
      };
    }
  } catch (e) {
    console.warn("Live TMDB fetch failed, falling back to showcase:", e.message);
  }

  const filtered = SHOWCASE_MOVIES.filter(
    (m) => (m.category && m.category.includes("upcoming")) || m.status === "Upcoming"
  ).sort((a, b) => new Date(b.release_date || 0) - new Date(a.release_date || 0));

  const list = filtered.length ? filtered : SHOWCASE_MOVIES;
  return paginateLocalResults(list, page, 12);
}

export async function searchMovies(query, page = 1) {
  if (!query || !query.trim()) {
    return { results: [], total_pages: 0, isLive: false };
  }

  try {
    if (hasApiKey()) {
      const data = await tmdbFetch("/search/movie", {
        query: query.trim(),
        page,
        include_adult: false,
      });
      return {
        results: data.results.map(normalizeMovie),
        page: data.page,
        total_pages: data.total_pages,
        total_results: data.total_results,
        isLive: true,
      };
    }
  } catch (e) {
    console.warn("Live search failed, falling back to local search:", e.message);
  }

  // Showcase fallback search
  const q = query.toLowerCase().trim();
  const matched = SHOWCASE_MOVIES.filter(
    (m) =>
      m.title.toLowerCase().includes(q) ||
      m.overview?.toLowerCase().includes(q) ||
      m.director?.toLowerCase().includes(q) ||
      m.cast?.some((c) => c.name.toLowerCase().includes(q))
  );

  return paginateLocalResults(matched, page, 12);
}

export async function discoverMovies({
  genreId = "all",
  sortBy = "popularity.desc",
  minRating = 0,
  vibeId = "all",
  decadeId = "all",
  page = 1,
}) {
  try {
    if (hasApiKey()) {
      const params = {
        page,
        sort_by: sortBy,
        include_adult: false,
      };
      const genreParts = [];
      if (genreId && genreId !== "all") {
        genreParts.push(genreId);
      }
      if (vibeId && vibeId !== "all") {
        const vibe = MOVIE_VIBES.find((v) => v.id === vibeId);
        if (vibe?.genreIds?.length) {
          genreParts.push(...vibe.genreIds);
        }
        if (vibe?.minRating) {
          params["vote_average.gte"] = Math.max(minRating || 0, vibe.minRating);
        }
      }
      if (genreParts.length) {
        params.with_genres = [...new Set(genreParts.map(String))].join(",");
      }
      if (minRating > 0 && params["vote_average.gte"] === undefined) {
        params["vote_average.gte"] = minRating;
      }
      if (decadeId && decadeId !== "all") {
        const decadeObj = DECADES.find((d) => d.id === decadeId);
        if (decadeObj) {
          params["primary_release_date.gte"] = `${decadeObj.startYear}-01-01`;
          params["primary_release_date.lte"] = `${decadeObj.endYear}-12-31`;
        }
      }
      const data = await tmdbFetch("/discover/movie", params);
      return {
        results: data.results.map(normalizeMovie),
        page: data.page,
        total_pages: data.total_pages,
        isLive: true,
      };
    }
  } catch (e) {
    console.warn("Discover fetch failed, fallback:", e.message);
  }

  // Showcase filtering fallback
  let list = [...SHOWCASE_MOVIES];

  // Filter by genre
  if (genreId && genreId !== "all") {
    const numId = Number(genreId);
    list = list.filter((m) => m.genre_ids?.includes(numId));
  }

  // Filter by vibe
  if (vibeId && vibeId !== "all") {
    const vibe = MOVIE_VIBES.find((v) => v.id === vibeId);
    if (vibe) {
      if (vibe.genreIds) {
        list = list.filter((m) => m.genre_ids?.some((gid) => vibe.genreIds.includes(gid)));
      }
      if (vibe.minRating) {
        list = list.filter((m) => (m.vote_average || 0) >= vibe.minRating);
      }
    }
  }

  // Filter by era/decade
  if (decadeId && decadeId !== "all") {
    const dec = DECADES.find((d) => d.id === decadeId);
    if (dec) {
      list = list.filter((m) => {
        const year = m.release_date ? new Date(m.release_date).getFullYear() : 2024;
        return year >= dec.startYear && year <= dec.endYear;
      });
    }
  }

  // Filter by min rating
  if (minRating > 0) {
    list = list.filter((m) => (m.vote_average || 0) >= minRating);
  }

  // Sort
  if (sortBy === "vote_average.desc") {
    list.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
  } else if (sortBy === "primary_release_date.desc") {
    list.sort((a, b) => new Date(b.release_date || 0) - new Date(a.release_date || 0));
  } else {
    list.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
  }

  return paginateLocalResults(list, page, 12);
}

export async function getMovieDetails(id) {
  try {
    if (hasApiKey()) {
      const data = await tmdbFetch(`/movie/${id}`, {
        append_to_response: "videos,credits,similar,recommendations",
      });

      const director = data.credits?.crew?.find((c) => c.job === "Director")?.name || "Director";
      const cast = (data.credits?.cast || []).slice(0, 10);
      const similar = (data.similar?.results || data.recommendations?.results || []).slice(0, 8).map(normalizeMovie);

      const normalized = normalizeMovie(data);
      return {
        ...normalized,
        director,
        cast,
        similar,
        isLive: true,
      };
    }
  } catch (e) {
    console.warn("Movie details live fetch failed:", e.message);
  }

  const found = SHOWCASE_MOVIES.find((m) => Number(m.id) === Number(id));
  if (!found) return null;

  const similar = SHOWCASE_MOVIES.filter((m) => Number(m.id) !== Number(found.id)).slice(0, 6);

  return {
    ...normalizeMovie(found),
    similar,
    isLive: false,
  };
}

export async function getMovieTrailerKey(movieId) {
  if (!movieId) return null;
  try {
    if (hasApiKey()) {
      const data = await tmdbFetch(`/movie/${movieId}/videos`);
      if (data?.results?.length) {
        const trailer =
          data.results.find(
            (v) => v.site === "YouTube" && v.type === "Trailer" && v.official
          ) ||
          data.results.find(
            (v) => v.site === "YouTube" && v.type === "Trailer"
          ) ||
          data.results.find(
            (v) => v.site === "YouTube" && v.type === "Teaser"
          ) ||
          data.results.find((v) => v.site === "YouTube");

        if (trailer?.key) return trailer.key;
      }
    }
  } catch (e) {
    console.warn("Failed to fetch movie trailer:", e.message);
  }
  return null;
}

