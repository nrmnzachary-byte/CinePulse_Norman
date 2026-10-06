import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, ExternalLink, Bookmark, Sparkles } from "lucide-react";
import { isInWatchlist, toggleWatchlist } from "../services/watchlist.js";
import { cinematicAudio } from "../services/soundEngine.js";
import { getMovieTrailerKey } from "../services/tmdbApi.js";

export default function TrailerModal({ movie, onClose }) {
  const [trailerKey, setTrailerKey] = useState(() => movie?.trailer_key || "Way9Dexny3w");

  useEffect(() => {
    if (!movie) return;

    cinematicAudio.playTrailerOpen();

    let isMounted = true;
    if (movie.id) {
      getMovieTrailerKey(movie.id).then((key) => {
        if (isMounted && key) {
          setTrailerKey(key);
        }
      });
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      isMounted = false;
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [movie, onClose]);

  if (!movie) return null;

  const inWatchlist = isInWatchlist(movie.id);

  return (
    <div className="trailer-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="trailer-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="trailer-modal-header">
          <div className="trailer-header-info">
            <span className="trailer-badge">
              <Sparkles size={13} className="text-amber-400" />
              OFFICIAL TRAILER
            </span>
            <h3 className="trailer-title">{movie.title}</h3>
          </div>
          <button
            className="trailer-close-btn"
            onClick={onClose}
            aria-label="Close Trailer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="trailer-video-wrapper">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
            title={`${movie.title} Official Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="trailer-iframe"
          />
        </div>

        <div className="trailer-modal-footer">
          <p className="trailer-overview">
            {movie.overview
              ? movie.overview.slice(0, 160) + (movie.overview.length > 160 ? "..." : "")
              : "Discover this cinema premiere on TMDB."}
          </p>

          <div className="trailer-actions">
            <button
              className={`btn-action-pill ${inWatchlist ? "active" : ""}`}
              onClick={() => toggleWatchlist(movie)}
            >
              <Bookmark size={15} fill={inWatchlist ? "currentColor" : "none"} />
              {inWatchlist ? "In Watchlist" : "Add to Watchlist"}
            </button>

            <Link
              to={`/movie/${movie.id}`}
              className="btn-action-pill primary"
              onClick={onClose}
            >
              Full Details
              <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
