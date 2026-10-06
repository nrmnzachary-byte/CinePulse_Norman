import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Bookmark,
  CheckCircle2,
  Trash2,
  Play,
  Film,
  Clock,
  Star,
} from "lucide-react";
import {
  getWatchlist,
  removeFromWatchlist,
  toggleWatchedStatus,
  clearWatchlist,
  WATCHLIST_EVENT,
} from "../services/watchlist.js";
import { getPosterUrl } from "../config.js";
import { cinematicAudio } from "../services/soundEngine.js";
import TrailerModal from "../components/TrailerModal.jsx";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState(() => getWatchlist());
  const [filter, setFilter] = useState("all"); // 'all' | 'unwatched' | 'watched'
  const [trailerMovie, setTrailerMovie] = useState(null);

  useEffect(() => {
    const handleUpdate = () => {
      setWatchlist(getWatchlist());
    };
    window.addEventListener(WATCHLIST_EVENT, handleUpdate);
    return () => window.removeEventListener(WATCHLIST_EVENT, handleUpdate);
  }, []);

  const totalRuntimeMinutes = watchlist.reduce(
    (acc, cur) => acc + (cur.runtime || 120),
    0
  );
  const runtimeHours = Math.floor(totalRuntimeMinutes / 60);
  const runtimeRemainingMins = totalRuntimeMinutes % 60;

  const watchedCount = watchlist.filter((m) => m.watched).length;
  const unwatchedCount = watchlist.length - watchedCount;

  const filteredMovies = watchlist.filter((m) => {
    if (filter === "watched") return m.watched;
    if (filter === "unwatched") return !m.watched;
    return true;
  });

  const handleRemove = (id) => {
    removeFromWatchlist(id);
  };

  const handleToggleWatched = (id) => {
    cinematicAudio.playClick();
    toggleWatchedStatus(id);
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear your entire watchlist?")) {
      clearWatchlist();
    }
  };

  return (
    <div className="watchlist-page-container">
      <div className="section-container">
        {/* Header Block */}
        <div className="watchlist-hero-header">
          <div className="flex items-center gap-2 mb-2">
            <Bookmark size={22} className="text-amber-400" />
            <span className="text-amber-400 text-sm font-semibold tracking-wider uppercase">
              Personal Cinema Queue
            </span>
          </div>
          <h1 className="watchlist-title">My Movie Watchlist</h1>
          <p className="watchlist-desc">
            Keep track of cinema you want to stream and celebrate the films you've experienced.
          </p>

          {/* Metrics Strip */}
          {watchlist.length > 0 && (
            <div className="watchlist-stats-row">
              <div className="stat-pill">
                <Film size={15} className="text-amber-400" />
                <span>
                  <strong>{watchlist.length}</strong> Saved Titles
                </span>
              </div>

              <div className="stat-pill">
                <Clock size={15} className="text-blue-400" />
                <span>
                  <strong>{runtimeHours}h {runtimeRemainingMins}m</strong> Total Binge Time
                </span>
              </div>

              <div className="stat-pill">
                <CheckCircle2 size={15} className="text-emerald-400" />
                <span>
                  <strong>{watchedCount}</strong> Completed
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Content Area */}
        {watchlist.length === 0 ? (
          <div className="watchlist-empty-state">
            <div className="empty-icon-circle">
              <Film size={44} className="text-amber-400" />
            </div>
            <h3 className="empty-title">Your Watchlist is Empty</h3>
            <p className="empty-desc">
              Explore box-office hits, award-winning classics, and add your favorite movies
              with a single click.
            </p>
            <Link to="/" className="btn-primary-gradient mt-4">
              Explore Cinema Atlas
            </Link>
          </div>
        ) : (
          <div className="watchlist-content-section">
            {/* Filter Tabs & Clear Action */}
            <div className="watchlist-controls-bar">
              <div className="category-tabs-row mb-0">
                <button
                  onClick={() => setFilter("all")}
                  className={`category-tab-btn ${filter === "all" ? "active" : ""}`}
                >
                  All ({watchlist.length})
                </button>
                <button
                  onClick={() => setFilter("unwatched")}
                  className={`category-tab-btn ${filter === "unwatched" ? "active" : ""}`}
                >
                  Plan to Watch ({unwatchedCount})
                </button>
                <button
                  onClick={() => setFilter("watched")}
                  className={`category-tab-btn ${filter === "watched" ? "active" : ""}`}
                >
                  Watched ({watchedCount})
                </button>
              </div>

              <button
                onClick={handleClearAll}
                className="btn-danger-ghost text-xs"
                title="Clear all saved movies"
              >
                <Trash2 size={14} /> Clear All
              </button>
            </div>

            {/* Movie List Grid */}
            <div className="watchlist-grid">
              {filteredMovies.map((movie) => (
                <div
                  key={movie.id}
                  className={`watchlist-item-card ${movie.watched ? "is-watched" : ""}`}
                >
                  <div className="watchlist-poster-col">
                    <img
                      src={getPosterUrl(movie.poster_path, "w342")}
                      alt={movie.title}
                      className="watchlist-poster-img"
                    />
                    <button
                      onClick={() => setTrailerMovie(movie)}
                      className="watchlist-play-btn"
                      title="Play Trailer"
                    >
                      <Play size={16} fill="currentColor" className="ml-0.5" />
                    </button>
                  </div>

                  <div className="watchlist-details-col">
                    <div className="watchlist-card-header">
                      <div>
                        <Link
                          to={`/movie/${movie.id}`}
                          className="watchlist-movie-title"
                        >
                          {movie.title}
                        </Link>
                        <div className="watchlist-meta-row">
                          <span>
                            {movie.release_date
                              ? new Date(movie.release_date).getFullYear()
                              : "Film"}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Star size={12} className="text-amber-400" fill="currentColor" />
                            {Number(movie.vote_average || 7.5).toFixed(1)}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemove(movie.id)}
                        className="watchlist-remove-btn"
                        title="Remove from Watchlist"
                        aria-label="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <p className="watchlist-overview">
                      {movie.overview || "Discover this cinema release on TMDB."}
                    </p>

                    <div className="watchlist-card-footer">
                      <button
                        onClick={() => handleToggleWatched(movie.id)}
                        className={`btn-watched-toggle ${
                          movie.watched ? "watched" : ""
                        }`}
                      >
                        <CheckCircle2 size={16} />
                        <span>{movie.watched ? "Watched!" : "Mark as Watched"}</span>
                      </button>

                      <Link
                        to={`/movie/${movie.id}`}
                        className="btn-details-ghost"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trailer Modal */}
      {trailerMovie && (
        <TrailerModal
          movie={trailerMovie}
          onClose={() => setTrailerMovie(null)}
        />
      )}
    </div>
  );
}
