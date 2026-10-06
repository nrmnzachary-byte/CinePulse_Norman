import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Film, Star, Flame, Calendar, Bookmark, Shuffle, ArrowRight } from "lucide-react";
import { searchMovies } from "../services/tmdbApi.js";
import { getPosterUrl } from "../config.js";
import { cinematicAudio } from "../services/soundEngine.js";
import SafeImage from "./SafeImage.jsx";

export default function CommandPalette({ isOpen, onClose, onOpenSpinReel }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
    setQuery("");
    setResults([]);
    setTimeout(() => inputRef.current?.focus(), 50);
    cinematicAudio.playClick();

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const data = await searchMovies(query);
        setResults(data.results.slice(0, 6));
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const handleSelectMovie = (id) => {
    cinematicAudio.playClick();
    onClose();
    navigate(`/movie/${id}`);
  };

  const handleNavigate = (path) => {
    cinematicAudio.playClick();
    onClose();
    navigate(path);
  };

  return (
    <div className="trailer-modal-backdrop command-palette-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="command-palette-card" onClick={(e) => e.stopPropagation()}>
        <div className="command-palette-search-bar">
          <Search size={20} className="command-palette-icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a movie title, actor, or director..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="command-palette-input"
          />
          {query && (
            <button onClick={() => setQuery("")} className="command-clear-btn" aria-label="Clear">
              <X size={16} />
            </button>
          )}
          <span className="command-esc-badge">ESC</span>
        </div>

        <div className="command-palette-body">
          {loading ? (
            <div className="p-6 text-center text-slate-400 text-sm">Searching cinema archives...</div>
          ) : results.length > 0 ? (
            <div className="command-results-list">
              <div className="command-section-title">Matching Movies</div>
              {results.map((m) => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => handleSelectMovie(m.id)}
                  className="command-result-item"
                >
                  <SafeImage
                    src={getPosterUrl(m.poster_path, "w185")}
                    alt={m.title}
                    className="command-movie-thumb"
                  />
                  <div className="command-movie-info">
                    <div className="command-movie-title">{m.title}</div>
                    <div className="command-movie-meta">
                      <span>{m.release_date ? new Date(m.release_date).getFullYear() : "Cinema"}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star size={11} fill="currentColor" /> {Number(m.vote_average || 7.5).toFixed(1)}
                      </span>
                      <span>•</span>
                      <span>{m.genres?.[0]?.name || "Feature"}</span>
                    </div>
                  </div>
                  <ArrowRight size={16} className="command-arrow-icon" />
                </button>
              ))}
            </div>
          ) : query ? (
            <div className="p-6 text-center text-slate-400 text-sm">
              No movies matched "<strong>{query}</strong>"
            </div>
          ) : (
            <div className="command-shortcuts-grid">
              <div className="command-section-title">Quick Cinema Navigation</div>
              <button onClick={() => handleNavigate("/trending")} className="command-shortcut-btn">
                <Flame size={16} className="text-orange-400" />
                <span>Trending Releases</span>
                <span className="command-key-hint">T</span>
              </button>
              <button onClick={() => handleNavigate("/top-rated")} className="command-shortcut-btn">
                <Star size={16} className="text-amber-400" />
                <span>Top Rated Masterpieces</span>
                <span className="command-key-hint">R</span>
              </button>
              <button onClick={() => handleNavigate("/now-playing")} className="command-shortcut-btn">
                <Film size={16} className="text-blue-400" />
                <span>Now Playing in Theaters</span>
              </button>
              <button onClick={() => handleNavigate("/upcoming")} className="command-shortcut-btn">
                <Calendar size={16} className="text-purple-400" />
                <span>Upcoming Blockbusters</span>
              </button>
              <button onClick={() => handleNavigate("/watchlist")} className="command-shortcut-btn">
                <Bookmark size={16} className="text-red-400" />
                <span>My Personal Watchlist</span>
                <span className="command-key-hint">W</span>
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenSpinReel();
                }}
                className="command-shortcut-btn highlight"
              >
                <Shuffle size={16} className="text-amber-400" />
                <span>Spin the Cinema Reel</span>
                <span className="command-key-hint">D</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
