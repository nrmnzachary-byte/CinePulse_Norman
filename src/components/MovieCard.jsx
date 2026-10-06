import { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Play, Bookmark, Sparkles, Eye } from "lucide-react";
import { getPosterUrl, getPosterSrcSet } from "../config.js";
import { isInWatchlist, toggleWatchlist, WATCHLIST_EVENT } from "../services/watchlist.js";
import { cinematicAudio } from "../services/soundEngine.js";
import SafeImage from "./SafeImage.jsx";

function MovieCard({
  movie,
  onOpenTrailer,
  onOpenQuickView,
  rank = null,
  viewMode = "grid",
  priority = false,
}) {
  const [inWatchlist, setInWatchlist] = useState(() => isInWatchlist(movie.id));

  useEffect(() => {
    const handleUpdate = () => {
      setInWatchlist(isInWatchlist(movie.id));
    };
    handleUpdate();
    window.addEventListener(WATCHLIST_EVENT, handleUpdate);
    return () => window.removeEventListener(WATCHLIST_EVENT, handleUpdate);
  }, [movie.id]);

  const handleWatchlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const result = toggleWatchlist(movie);
    setInWatchlist(result.added);
  };

  const handleTrailerClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onOpenTrailer) {
      onOpenTrailer(movie);
    }
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    cinematicAudio.playClick();
    if (onOpenQuickView) {
      onOpenQuickView(movie);
    }
  };

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "Cinema";

  const primaryGenre =
    movie.genres?.[0]?.name ||
    (movie.genre_ids?.[0] ? "Feature" : "Film");

  const rating = movie.vote_average ? Number(movie.vote_average).toFixed(1) : "—";
  const isAcclaimed = movie.vote_average >= 8.5;
  const posterSrc = getPosterUrl(movie.poster_path, viewMode === "list" ? "w342" : "w500");
  const posterSrcSet = getPosterSrcSet(movie.poster_path);

  if (viewMode === "list") {
    return (
      <div className="movie-card-list-view group">
        <div className="list-view-poster">
          {rank && <div className="list-rank-badge">#{rank}</div>}
          <SafeImage
            src={posterSrc}
            srcSet={posterSrcSet}
            sizes="90px"
            alt={movie.title}
            className="list-poster-img"
          />
        </div>

        <div className="list-view-body">
          <div className="list-view-header">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="list-view-year">{releaseYear}</span>
                <span className="text-slate-500">•</span>
                <span className="list-view-genre">{primaryGenre}</span>
                {isAcclaimed && (
                  <>
                    <span className="text-slate-500">•</span>
                    <span className="text-amber-400 font-bold text-xs flex items-center gap-0.5">
                      <Sparkles size={11} /> Masterpiece
                    </span>
                  </>
                )}
              </div>
              <Link to={`/movie/${movie.id}`} className="list-view-title">
                {movie.title}
              </Link>
            </div>

            <div className="list-view-rating">
              <Star size={14} className="star-icon" fill="currentColor" />
              <span>{rating}</span>
            </div>
          </div>

          <p className="list-view-overview">
            {movie.overview || "Discover this cinema premiere on TMDB."}
          </p>

          <div className="list-view-actions">
            <button onClick={handleTrailerClick} className="btn-action-pill primary text-xs">
              <Play size={14} fill="currentColor" />
              <span>Trailer</span>
            </button>

            <button
              onClick={handleWatchlistClick}
              className={`btn-action-pill text-xs ${inWatchlist ? "active" : ""}`}
            >
              <Bookmark size={14} fill={inWatchlist ? "currentColor" : "none"} />
              <span>{inWatchlist ? "In Watchlist" : "Watchlist"}</span>
            </button>

            <button onClick={handleQuickViewClick} className="btn-action-pill text-xs">
              <Eye size={14} />
              <span>Quick Look</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="movie-card group">
      <div className="movie-poster-frame">
        {rank && (
          <div className="trending-rank-number" aria-label={`Rank ${rank}`}>
            {rank}
          </div>
        )}

        <SafeImage
          src={posterSrc}
          srcSet={posterSrcSet}
          sizes="(max-width: 640px) 46vw, 210px"
          alt={movie.title}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className="movie-poster-img"
        />
        <div className="card-shine" aria-hidden="true" />

        <div className="movie-card-top-bar">
          <button
            onClick={handleWatchlistClick}
            className={`card-bookmark-btn ${inWatchlist ? "active" : ""}`}
            title={inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            aria-label="Toggle Watchlist"
          >
            <Bookmark size={15} fill={inWatchlist ? "currentColor" : "none"} />
          </button>

          <div className={`card-rating-pill ${isAcclaimed ? "acclaimed" : ""}`}>
            <Star size={12} className="star-icon" fill="currentColor" />
            <span>{rating}</span>
          </div>
        </div>

        <div className="movie-card-overlay">
          <div className="overlay-content">
            <button
              onClick={handleTrailerClick}
              className="overlay-play-btn"
              title="Watch Trailer"
            >
              <Play size={18} fill="currentColor" className="ml-0.5" />
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleQuickViewClick}
                className="overlay-quicklook-btn"
                title="Quick Preview"
              >
                <Eye size={13} />
                <span>Preview</span>
              </button>

              <Link
                to={`/movie/${movie.id}`}
                className="overlay-details-link"
                onClick={() => cinematicAudio.playClick()}
              >
                Details
              </Link>
            </div>
          </div>
        </div>

        {isAcclaimed && !rank && (
          <div className="acclaimed-ribbon" title="Critically Acclaimed (8.5+ Rating)">
            <Sparkles size={11} /> Masterpiece
          </div>
        )}
      </div>

      <div className="movie-card-info">
        <Link
          to={`/movie/${movie.id}`}
          className="movie-card-title"
          title={movie.title}
          onClick={() => cinematicAudio.playClick()}
        >
          {movie.title}
        </Link>
        <div className="movie-card-meta">
          <span className="movie-year">{releaseYear}</span>
          <span className="meta-dot">•</span>
          <span className="movie-genre-tag">{primaryGenre}</span>
        </div>
      </div>
    </article>
  );
}

export default memo(MovieCard);
