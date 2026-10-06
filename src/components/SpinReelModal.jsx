import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Play, Sparkles, RefreshCw, Star, Film } from "lucide-react";
import confetti from "canvas-confetti";
import { SHOWCASE_MOVIES, getPosterUrl, getBackdropUrl } from "../config.js";
import { cinematicAudio } from "../services/soundEngine.js";

export default function SpinReelModal({ isOpen, onClose, onOpenTrailer }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [previewMovie, setPreviewMovie] = useState(null);

  const startSpin = () => {
    setIsSpinning(true);
    cinematicAudio.playClick();

    let counter = 0;
    const totalSteps = 24;
    const interval = setInterval(() => {
      counter++;
      const randomIdx = Math.floor(Math.random() * SHOWCASE_MOVIES.length);
      setPreviewMovie(SHOWCASE_MOVIES[randomIdx]);
      cinematicAudio.playClick();

      if (counter >= totalSteps) {
        clearInterval(interval);
        const finalIdx = Math.floor(Math.random() * SHOWCASE_MOVIES.length);
        const winner = SHOWCASE_MOVIES[finalIdx];
        setSelectedMovie(winner);
        setIsSpinning(false);
        cinematicAudio.playWatchlistAdd();

        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#f59e0b", "#e50914", "#8b5cf6", "#ffffff"],
        });
      }
    }, 75);
  };

  useEffect(() => {
    if (isOpen) {
      setSelectedMovie(null);
      setPreviewMovie(null);
      startSpin();

      const handleKeyDown = (e) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const displayMovie = selectedMovie || previewMovie || SHOWCASE_MOVIES[0];

  return (
    <div className="trailer-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="spin-wheel-card" onClick={(e) => e.stopPropagation()}>
        <div className="spin-wheel-header">
          <div className="flex items-center gap-2">
            <Film size={20} className="text-amber-400" />
            <h3 className="spin-wheel-title">Cinema Roulette — Spin the Reel</h3>
          </div>
          <button className="trailer-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="spin-wheel-body">
          <div className="spin-wheel-stage">
            <div className="spin-backdrop-glow" />
            <img
              src={getBackdropUrl(displayMovie.backdrop_path, "w780")}
              alt={displayMovie.title}
              className={`spin-backdrop-img ${isSpinning ? "blur-sm" : ""}`}
            />
            <div className="spin-stage-overlay">
              <div className={`spin-poster-frame ${isSpinning ? "spinning-pulse" : "winner-bounce"}`}>
                <img
                  src={getPosterUrl(displayMovie.poster_path, "w500")}
                  alt={displayMovie.title}
                  className="spin-poster-img"
                />
              </div>

              <div className="spin-winner-info">
                {!isSpinning && selectedMovie ? (
                  <>
                    <div className="spin-badge-winner">
                      <Sparkles size={14} className="text-amber-400" />
                      TONIGHT'S CHOSEN PREMIERE
                    </div>
                    <h2 className="spin-winner-title">{selectedMovie.title}</h2>
                    <div className="flex items-center gap-3 my-2">
                      <span className="flex items-center gap-1 text-amber-400 font-bold text-sm">
                        <Star size={14} fill="currentColor" />
                        {Number(selectedMovie.vote_average || 8.0).toFixed(1)}
                      </span>
                      <span className="text-slate-400 text-sm">
                        {selectedMovie.release_date
                          ? new Date(selectedMovie.release_date).getFullYear()
                          : "Cinema"}
                      </span>
                      <span className="text-slate-400 text-sm">
                        {selectedMovie.genres?.[0]?.name || "Feature"}
                      </span>
                    </div>
                    <p className="spin-winner-overview">
                      {selectedMovie.overview?.slice(0, 150)}...
                    </p>
                  </>
                ) : (
                  <div className="spin-shuffling-text">
                    <RefreshCw size={24} className="animate-spin text-amber-400 mx-auto mb-2" />
                    <p className="font-bold text-lg text-slate-200">Selecting tonight's masterpiece...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="spin-wheel-footer">
            <button
              onClick={startSpin}
              disabled={isSpinning}
              className="btn-secondary-flat flex items-center gap-2"
            >
              <RefreshCw size={16} className={isSpinning ? "animate-spin" : ""} />
              <span>Spin Again</span>
            </button>

            {!isSpinning && selectedMovie && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    onClose();
                    onOpenTrailer(selectedMovie);
                  }}
                  className="btn-action-pill"
                >
                  <Play size={16} fill="currentColor" />
                  <span>Trailer</span>
                </button>

                <Link
                  to={`/movie/${selectedMovie.id}`}
                  onClick={onClose}
                  className="btn-primary-gradient"
                >
                  <span>Explore Film</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
