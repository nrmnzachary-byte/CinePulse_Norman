import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Play, Bookmark, Info, Star, Sparkles, ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import { getBackdropUrl, getPosterUrl } from "../config.js";
import { isInWatchlist, toggleWatchlist, WATCHLIST_EVENT } from "../services/watchlist.js";
import { cinematicAudio } from "../services/soundEngine.js";
import SafeImage from "./SafeImage.jsx";

const AUTO_ADVANCE_MS = 8000;

export default function HeroBanner({ movies = [], onOpenTrailer }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [, setWatchlistVersion] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progressPct, setProgressPct] = useState(0);
  const [slideDir, setSlideDir] = useState("right");
  const timerRef = useRef(null);
  const rafRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  const currentMovie = movies[currentIndex] || movies[0];
  const inWatchlist = currentMovie ? isInWatchlist(currentMovie.id) : false;

  useEffect(() => {
    if (currentIndex >= movies.length) setCurrentIndex(0);
  }, [movies.length, currentIndex]);

  useEffect(() => {
    const handleWatchlistChange = () => setWatchlistVersion((v) => v + 1);
    window.addEventListener(WATCHLIST_EVENT, handleWatchlistChange);
    return () => window.removeEventListener(WATCHLIST_EVENT, handleWatchlistChange);
  }, []);

  const advanceTo = useCallback((idx, dir) => {
    if (!movies.length) return;
    const next = ((idx % movies.length) + movies.length) % movies.length;
    setSlideDir(dir);
    setCurrentIndex(next);
  }, [movies.length]);

  useEffect(() => {
    if (movies.length <= 1 || isPaused) {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timerRef.current);
      if (isPaused) return;
      setProgressPct(0);
      return;
    }

    startTimeRef.current = Date.now();
    setProgressPct(0);

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / AUTO_ADVANCE_MS) * 100, 100);
      setProgressPct(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    timerRef.current = setTimeout(() => {
      advanceTo(currentIndex + 1, "right");
    }, AUTO_ADVANCE_MS);

    return () => {
      clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [currentIndex, movies.length, isPaused, advanceTo]);

  useEffect(() => {
    const onKey = (e) => {
      if (document.querySelector('[role="dialog"]')) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        advanceTo(currentIndex + 1, "right");
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        advanceTo(currentIndex - 1, "left");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advanceTo, currentIndex]);

  const nextMovie = movies[(currentIndex + 1) % Math.max(movies.length, 1)];

  useEffect(() => {
    if (!nextMovie?.backdrop_path) return;
    const img = new Image();
    img.src = getBackdropUrl(nextMovie.backdrop_path, "w1280");
  }, [nextMovie]);

  if (!currentMovie) return null;

  const handleToggleWatchlist = () => {
    toggleWatchlist(currentMovie);
    setWatchlistVersion((v) => v + 1);
  };

  const handlePrev = () => {
    cinematicAudio.playClick();
    advanceTo(currentIndex - 1, "left");
  };

  const handleNext = () => {
    cinematicAudio.playClick();
    advanceTo(currentIndex + 1, "right");
  };

  const releaseYear = currentMovie.release_date
    ? new Date(currentMovie.release_date).getFullYear()
    : "—";

  const runtimeText = currentMovie.runtime
    ? `${Math.floor(currentMovie.runtime / 60)}h ${currentMovie.runtime % 60}m`
    : "";

  return (
    <section
      className="hero-banner-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Featured Movie Premiere"
    >
      <div className="hero-letterbox" aria-hidden="true" />
      <div className="hero-backdrop-wrapper">
        <SafeImage
          key={currentMovie.id}
          src={getBackdropUrl(currentMovie.backdrop_path, "w1280")}
          alt=""
          fallback="backdrop"
          loading="eager"
          fetchPriority="high"
          className="hero-backdrop-img hero-ken-burns animate-fade-in"
        />
        <div className="hero-gradient-overlay" />
        <div className="hero-gradient-bottom" />
        <div className="hero-gradient-left" />
        <div className="hero-scan-lines" />
        <div className="hero-film-grain" />
      </div>

      {movies.length > 1 && (
        <div className="hero-progress-track">
          <div
            className="hero-progress-fill"
            style={{ width: `${progressPct}%`, transition: isPaused ? "none" : "width 80ms linear" }}
          />
        </div>
      )}

      <div className="hero-content-container">
        <div className={`hero-details hero-slide-${slideDir}`} key={currentMovie.id}>
          <div className="hero-spotlight-pill">
            <Sparkles size={13} className="text-amber-400" />
            <span>FEATURED SPOTLIGHT PREMIERE</span>
            <span className="hero-pill-sep">·</span>
            <span className="hero-pill-counter">{currentIndex + 1}/{movies.length}</span>
          </div>

          <h1 className="hero-title">{currentMovie.title}</h1>

          {currentMovie.tagline && (
            <p className="hero-tagline">"{currentMovie.tagline}"</p>
          )}

          <div className="hero-meta-bar">
            <div className="hero-rating-badge">
              <Star size={14} className="star-icon" fill="currentColor" />
              <span>{Number(currentMovie.vote_average || 8.5).toFixed(1)}</span>
              <span className="rating-max">/10</span>
            </div>

            <span className="meta-divider">•</span>
            <span className="hero-meta-item">{releaseYear}</span>

            {runtimeText && (
              <>
                <span className="meta-divider">•</span>
                <span className="hero-meta-item">{runtimeText}</span>
              </>
            )}

            {currentMovie.director && (
              <>
                <span className="meta-divider">•</span>
                <span className="hero-director-credit">Directed by <strong>{currentMovie.director}</strong></span>
              </>
            )}
          </div>

          <div className="hero-genres-row">
            {currentMovie.genres?.map((g) => (
              <span key={g.id || g.name} className="hero-genre-pill">
                {g.name}
              </span>
            ))}
          </div>

          <p className="hero-overview">{currentMovie.overview}</p>

          <div className="hero-actions-row">
            <button
              onClick={() => onOpenTrailer(currentMovie)}
              className="btn-hero-primary"
            >
              <Play size={18} fill="currentColor" className="ml-0.5" />
              <span>Watch Trailer</span>
            </button>

            <button
              onClick={handleToggleWatchlist}
              className={`btn-hero-secondary ${inWatchlist ? "active" : ""}`}
            >
              <Bookmark size={18} fill={inWatchlist ? "currentColor" : "none"} />
              <span>{inWatchlist ? "In Watchlist" : "Add to Watchlist"}</span>
            </button>

            <Link
              to={`/movie/${currentMovie.id}`}
              className="btn-hero-ghost"
              onClick={() => cinematicAudio.playClick()}
            >
              <Info size={18} />
              <span>Details</span>
            </Link>
          </div>
        </div>

        {movies.length > 1 && (
          <div className="hero-switcher-container">
            <div className="hero-switcher-header">
              <span className="switcher-label">Spotlight Selection</span>
              <div className="switcher-nav-arrows">
                <button
                  onClick={handlePrev}
                  className="switcher-arrow-btn"
                  aria-label="Previous Spotlight"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={handleNext}
                  className="switcher-arrow-btn"
                  aria-label="Next Spotlight"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="hero-thumbnails-grid">
              {movies.slice(0, 5).map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => {
                    cinematicAudio.playClick();
                    advanceTo(idx, idx > currentIndex ? "right" : "left");
                  }}
                  className={`hero-thumb-btn ${idx === currentIndex ? "active" : ""}`}
                  title={m.title}
                >
                  <SafeImage
                    src={getPosterUrl(m.poster_path, "w185")}
                    alt={m.title}
                    className="hero-thumb-img"
                  />
                  {idx === currentIndex && <div className="thumb-active-glow" />}
                </button>
              ))}
            </div>

            <div className="hero-dot-indicators">
              {movies.slice(0, 5).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => advanceTo(idx, idx > currentIndex ? "right" : "left")}
                  className={`hero-dot ${idx === currentIndex ? "active" : ""}`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
