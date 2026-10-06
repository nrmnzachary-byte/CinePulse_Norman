import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Play, Bookmark, Star, Clock, Calendar, ExternalLink } from "lucide-react";
import { getPosterUrl, getBackdropUrl } from "../config.js";
import { isInWatchlist, toggleWatchlist } from "../services/watchlist.js";
import { cinematicAudio } from "../services/soundEngine.js";

export default function QuickViewModal({ movie, onClose, onOpenTrailer }) {
  const [inWatchlist, setInWatchlist] = useState(() => (movie ? isInWatchlist(movie.id) : false));

  useEffect(() => {
    if (!movie) return;
    setInWatchlist(isInWatchlist(movie.id));

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [movie, onClose]);

  if (!movie) return null;

  const handleToggleWatchlist = () => {
    const res = toggleWatchlist(movie);
    setInWatchlist(res.added);
  };
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "Cinema";

  const runtimeText = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : "2h 10m";

  return (
    <div className="trailer-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="quickview-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Backdrop Frame */}
        <div className="quickview-backdrop-frame">
          <img
            src={getBackdropUrl(movie.backdrop_path, "w1280")}
            alt={movie.title}
            className="quickview-backdrop-img"
          />
          <div className="quickview-backdrop-gradient" />
          <button className="quickview-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="quickview-content-grid">
          <div className="quickview-poster-wrap">
            <img
              src={getPosterUrl(movie.poster_path, "w500")}
              alt={movie.title}
              className="quickview-poster-img"
            />
          </div>

          <div className="quickview-details">
            <div className="quickview-header">
              <div className="flex items-center gap-2 mb-1">
                <span className="flex items-center gap-1 text-amber-400 font-extrabold text-sm">
                  <Star size={14} fill="currentColor" />
                  {Number(movie.vote_average || 8.0).toFixed(1)}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300 text-xs flex items-center gap-1">
                  <Calendar size={12} /> {releaseYear}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300 text-xs flex items-center gap-1">
                  <Clock size={12} /> {runtimeText}
                </span>
              </div>
              <h2 className="quickview-title">{movie.title}</h2>
              {movie.tagline && <p className="quickview-tagline">“{movie.tagline}”</p>}
            </div>

            <div className="quickview-genres">
              {movie.genres?.map((g) => (
                <span key={g.id || g.name} className="hero-genre-pill">
                  {g.name}
                </span>
              ))}
            </div>

            <p className="quickview-overview">{movie.overview}</p>

            <div className="quickview-actions">
              <button
                onClick={() => {
                  onClose();
                  onOpenTrailer(movie);
                }}
                className="btn-primary-gradient"
              >
                <Play size={16} fill="currentColor" />
                <span>Watch Trailer</span>
              </button>

              <button
                onClick={handleToggleWatchlist}
                className={`btn-action-pill ${inWatchlist ? "active" : ""}`}
              >
                <Bookmark size={16} fill={inWatchlist ? "currentColor" : "none"} />
                <span>{inWatchlist ? "In Watchlist" : "Watchlist"}</span>
              </button>

              <Link
                to={`/movie/${movie.id}`}
                onClick={() => {
                  cinematicAudio.playClick();
                  onClose();
                }}
                className="btn-secondary-flat flex items-center gap-1.5"
              >
                <span>Full Details</span>
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
