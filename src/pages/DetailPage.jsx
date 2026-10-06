import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Play,
  Bookmark,
  Calendar,
  Clock,
  Share2,
  Sparkles,
  Users,
  CheckCircle,
} from "lucide-react";
import { getMovieDetails } from "../services/tmdbApi.js";
import { getPosterUrl, getBackdropUrl, getProfileUrl } from "../config.js";
import SafeImage from "../components/SafeImage.jsx";
import { isInWatchlist, toggleWatchlist, WATCHLIST_EVENT } from "../services/watchlist.js";
import { cinematicAudio } from "../services/soundEngine.js";
import TrailerModal from "../components/TrailerModal.jsx";
import MovieCard from "../components/MovieCard.jsx";

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [activeTrailerMovie, setActiveTrailerMovie] = useState(null);

  useEffect(() => {
    let isMounted = true;
    window.scrollTo({ top: 0, behavior: "smooth" });

    getMovieDetails(id)
      .then((data) => {
        if (isMounted) {
          setMovie(data);
          if (data?.id) setInWatchlist(isInWatchlist(data.id));
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load movie details:", err);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    const handleWatchlistChange = () => {
      if (movie) setInWatchlist(isInWatchlist(movie.id));
    };
    window.addEventListener(WATCHLIST_EVENT, handleWatchlistChange);
    return () => window.removeEventListener(WATCHLIST_EVENT, handleWatchlistChange);
  }, [movie]);

  if (loading) {
    return (
      <div className="detail-loading-screen">
        <div className="cinema-spinner" />
        <p className="mt-4 text-slate-300 font-medium">Opening Cinema Archive...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="detail-not-found">
        <h2>Movie Not Found</h2>
        <p>We couldn't retrieve the cinema records for this title.</p>
        <Link to="/" className="btn-primary-gradient mt-4">
          Return to Cinema Atlas
        </Link>
      </div>
    );
  }

  const handleToggleWatchlist = () => {
    const res = toggleWatchlist(movie);
    setInWatchlist(res.added);
  };

  const handleShare = () => {
    cinematicAudio.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "—";

  const runtimeText = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : "—";

  const formatCurrency = (val) => {
    if (!val || val === 0) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="detail-page-container">
      {/* Immersive Backdrop Header */}
      <div className="detail-backdrop-frame">
        <SafeImage
          src={getBackdropUrl(movie.backdrop_path, "w1280")}
          alt=""
          fallback="backdrop"
          loading="eager"
          fetchPriority="high"
          className="detail-backdrop-img"
        />
        <div className="detail-backdrop-gradient" />
      </div>

      <div className="detail-content-wrapper">
        {/* Navigation & Back Action */}
        <div className="detail-top-nav">
          <button
            onClick={() => {
              cinematicAudio.playClick();
              if (window.history.length > 1) navigate(-1);
              else navigate("/");
            }}
            className="btn-back-nav"
          >
            <ArrowLeft size={16} />
            <span>Back to Explorer</span>
          </button>
        </div>

        {/* Main Grid: Left Poster & Right Information */}
        <div className="detail-main-grid">
          {/* Left Column: Poster & Quick Controls */}
          <div className="detail-left-col">
            <div className="detail-poster-wrapper">
              <SafeImage
                src={getPosterUrl(movie.poster_path, "w780")}
                alt={movie.title}
                loading="eager"
                className="detail-poster-img"
              />
              <button
                onClick={() => {
                  setActiveTrailerMovie(movie);
                  setShowTrailer(true);
                }}
                className="detail-poster-play-overlay"
                title="Watch Official Trailer"
              >
                <div className="poster-play-circle">
                  <Play size={24} fill="currentColor" className="ml-1" />
                </div>
                <span>Play Trailer</span>
              </button>
            </div>

            <div className="detail-left-actions">
              <button
                onClick={() => {
                  setActiveTrailerMovie(movie);
                  setShowTrailer(true);
                }}
                className="btn-detail-trailer"
              >
                <Play size={18} fill="currentColor" />
                <span>Watch Trailer</span>
              </button>

              <button
                onClick={handleToggleWatchlist}
                className={`btn-detail-watchlist ${inWatchlist ? "active" : ""}`}
              >
                <Bookmark size={18} fill={inWatchlist ? "currentColor" : "none"} />
                <span>{inWatchlist ? "In Your Watchlist" : "Add to Watchlist"}</span>
              </button>

              <button onClick={handleShare} className="btn-detail-share">
                {copied ? (
                  <>
                    <CheckCircle size={16} className="text-emerald-400" />
                    <span>Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 size={16} />
                    <span>Share Film</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Deep Metadata, Storyline, Cast */}
          <div className="detail-right-col">
            {/* Title & Tagline */}
            <div className="detail-header-block">
              {movie.vote_average >= 8.5 && (
                <div className="detail-acclaimed-badge">
                  <Sparkles size={13} className="text-amber-400" />
                  CRITICALLY ACCLAIMED MASTERPIECE
                </div>
              )}
              <h1 className="detail-title">{movie.title}</h1>
              {movie.tagline && (
                <p className="detail-tagline">“{movie.tagline}”</p>
              )}
            </div>

            {/* Quick Stats Pill Strip */}
            <div className="detail-stats-strip">
              <div className="stat-pill rating">
                <Star size={16} className="text-amber-400" fill="currentColor" />
                <span className="stat-highlight">{Number(movie.vote_average || 7.5).toFixed(1)}</span>
                <span className="stat-sub">({movie.vote_count?.toLocaleString()} votes)</span>
              </div>

              <div className="stat-pill">
                <Clock size={15} />
                <span>{runtimeText}</span>
              </div>

              <div className="stat-pill">
                <Calendar size={15} />
                <span>{releaseYear}</span>
              </div>

              <div className="stat-pill badge">
                <span>{movie.status || "Released"}</span>
              </div>
            </div>

            {/* Genre Tags */}
            <div className="detail-genres-wrap">
              {movie.genres?.map((g) => (
                <span key={g.id || g.name} className="detail-genre-pill">
                  {g.name}
                </span>
              ))}
            </div>

            {/* Storyline Overview */}
            <div className="detail-section-block">
              <h3 className="detail-section-heading">Storyline</h3>
              <p className="detail-overview-text">
                {movie.overview || "No detailed synopsis currently on file."}
              </p>
            </div>

            {/* Production & Financial Stats */}
            <div className="detail-stats-grid">
              {movie.director && (
                <div className="stat-card">
                  <span className="stat-card-label">Director</span>
                  <span className="stat-card-value">{movie.director}</span>
                </div>
              )}

              {movie.budget > 0 && (
                <div className="stat-card">
                  <span className="stat-card-label">Production Budget</span>
                  <span className="stat-card-value">{formatCurrency(movie.budget)}</span>
                </div>
              )}

              {movie.revenue > 0 && (
                <div className="stat-card">
                  <span className="stat-card-label">Worldwide Box Office</span>
                  <span className="stat-card-value">{formatCurrency(movie.revenue)}</span>
                </div>
              )}

              {movie.original_language && (
                <div className="stat-card">
                  <span className="stat-card-label">Original Language</span>
                  <span className="stat-card-value uppercase">
                    {movie.original_language}
                  </span>
                </div>
              )}
            </div>

            {/* Top Cast & Characters */}
            {movie.cast && movie.cast.length > 0 && (
              <div className="detail-section-block">
                <div className="flex items-center gap-2 mb-3">
                  <Users size={18} className="text-amber-400" />
                  <h3 className="detail-section-heading mb-0">Featured Cast</h3>
                </div>

                <div className="detail-cast-carousel">
                  {movie.cast.map((actor) => (
                    <div key={actor.id || actor.name} className="cast-card">
                      <div className="cast-photo-frame">
                        <SafeImage
                          src={getProfileUrl(actor.profile_path, "w185")}
                          alt={actor.name}
                          fallback="profile"
                          className="cast-photo-img"
                        />
                      </div>
                      <div className="cast-info">
                        <div className="cast-actor-name">{actor.name}</div>
                        <div className="cast-role-name">{actor.character || "Cast"}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar / Recommended Movies Carousel */}
        {movie.similar && movie.similar.length > 0 && (
          <div className="detail-similar-section">
            <h3 className="detail-section-heading mb-4">Recommended Titles</h3>
            <div className="similar-movies-grid">
              {movie.similar.slice(0, 5).map((sim) => (
                <MovieCard
                  key={sim.id}
                  movie={sim}
                  onOpenTrailer={(m) => {
                    setActiveTrailerMovie(m);
                    setShowTrailer(true);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trailer Modal */}
      {showTrailer && activeTrailerMovie && (
        <TrailerModal
          movie={activeTrailerMovie}
          onClose={() => {
            setShowTrailer(false);
            setActiveTrailerMovie(null);
          }}
        />
      )}
    </div>
  );
}
