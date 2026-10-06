import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Film,
  Bookmark,
  Volume2,
  VolumeX,
  Key,
  Menu,
  X,
  Star,
  Flame,
  Search,
  Sparkles,
  Calendar,
} from "lucide-react";
import { getWatchlist, WATCHLIST_EVENT } from "../services/watchlist.js";
import { hasApiKey } from "../services/tmdbApi.js";
import { cinematicAudio } from "../services/soundEngine.js";

export default function Navbar({ onOpenApiKeyModal, onOpenCommandPalette, onOpenSpinReel }) {
  const [watchlistCount, setWatchlistCount] = useState(() => getWatchlist().length);
  const [isLiveApi, setIsLiveApi] = useState(() => hasApiKey());
  const [isMuted, setIsMuted] = useState(cinematicAudio.muted);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleWatchlistChange = () => {
      setWatchlistCount(getWatchlist().length);
    };
    const handleAuthChange = () => {
      setIsLiveApi(hasApiKey());
    };

    window.addEventListener(WATCHLIST_EVENT, handleWatchlistChange);
    window.addEventListener("tmdb_auth_changed", handleAuthChange);

    return () => {
      window.removeEventListener(WATCHLIST_EVENT, handleWatchlistChange);
      window.removeEventListener("tmdb_auth_changed", handleAuthChange);
    };
  }, []);

  // Global keyboard shortcut for Command Palette (Ctrl+K or Cmd+K or /)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        onOpenCommandPalette();
      } else if (e.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        onOpenCommandPalette();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenCommandPalette]);

  const handleSoundToggle = () => {
    const next = cinematicAudio.toggleMute();
    setIsMuted(next);
  };

  const currentPath = location.pathname;

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link
          to="/"
          className="navbar-brand"
          onClick={() => {
            cinematicAudio.playClick();
            setMobileMenuOpen(false);
          }}
        >
          <div className="lb-brand-dots" aria-hidden="true">
            <span className="lb-dot lb-dot-orange" />
            <span className="lb-dot lb-dot-green" />
            <span className="lb-dot lb-dot-blue" />
          </div>
          <div className="brand-text-block">
            <span className="brand-title">CINE<span className="brand-highlight-text">PULSE</span></span>
            <span className="brand-tagline">FILM DIARY & ATLAS</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-desktop-nav" aria-label="Main Navigation">
          <Link
            to="/"
            className={`nav-link ${currentPath === "/" ? "active" : ""}`}
            onClick={() => cinematicAudio.playClick()}
          >
            Explore
          </Link>
          <Link
            to="/trending"
            className={`nav-link ${currentPath === "/trending" ? "active" : ""}`}
            onClick={() => cinematicAudio.playClick()}
          >
            <Flame size={14} className="mr-1 inline text-orange-400" />
            Trending
          </Link>
          <Link
            to="/top-rated"
            className={`nav-link ${currentPath === "/top-rated" ? "active" : ""}`}
            onClick={() => cinematicAudio.playClick()}
          >
            <Star size={14} className="mr-1 inline text-amber-400" />
            Top Rated
          </Link>
          <Link
            to="/now-playing"
            className={`nav-link ${currentPath === "/now-playing" ? "active" : ""}`}
            onClick={() => cinematicAudio.playClick()}
          >
            <Film size={14} className="mr-1 inline text-blue-400" />
            In Theaters
          </Link>
          <Link
            to="/upcoming"
            className={`nav-link ${currentPath === "/upcoming" ? "active" : ""}`}
            onClick={() => cinematicAudio.playClick()}
          >
            <Calendar size={14} className="mr-1 inline text-purple-400" />
            Upcoming
          </Link>
          <Link
            to="/watchlist"
            className={`nav-link ${currentPath === "/watchlist" ? "active" : ""}`}
            onClick={() => cinematicAudio.playClick()}
          >
            <Bookmark size={14} className="mr-1 inline text-red-400" />
            Watchlist
            {watchlistCount > 0 && (
              <span className="watchlist-nav-counter">{watchlistCount}</span>
            )}
          </Link>
        </nav>

        {/* Right Action Tools */}
        <div className="navbar-actions">
          {/* Quick Search Bar Button (Cmd+K) */}
          <button
            onClick={() => {
              cinematicAudio.playClick();
              onOpenCommandPalette();
            }}
            className="navbar-search-trigger-btn"
            title="Search movies (Ctrl+K or /)"
          >
            <Search size={15} />
            <span className="search-trigger-text">Search...</span>
            <span className="search-trigger-kbd">⌘K</span>
          </button>

          {/* Spin the Reel Button */}
          <button
            onClick={() => {
              cinematicAudio.playClick();
              onOpenSpinReel();
            }}
            className="btn-spin-reel-nav"
            title="Cinema Roulette — Spin the Reel"
          >
            <Sparkles size={14} className="text-amber-400" />
            <span className="spin-btn-label">Spin Reel</span>
          </button>

          {/* TMDB Connection Indicator */}
          <button
            onClick={() => {
              cinematicAudio.playClick();
              onOpenApiKeyModal();
            }}
            className={`tmdb-status-pill ${isLiveApi ? "live" : "showcase"}`}
            title="Configure TMDB API Key / Token"
          >
            <span className="status-dot-pulse" />
            <span className="tmdb-pill-label">
              {isLiveApi ? "TMDB Live" : "Showcase"}
            </span>
            <Key size={13} className="ml-1 opacity-75" />
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={handleSoundToggle}
            className="btn-icon-action"
            title={isMuted ? "Unmute Cinema Sound" : "Mute Cinema Sound"}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-hamburger-btn"
            aria-label="Open Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay animate-fade-in">
          <nav className="mobile-drawer-nav">
            <Link
              to="/"
              className={`mobile-nav-item ${currentPath === "/" ? "active" : ""}`}
              onClick={() => {
                cinematicAudio.playClick();
                setMobileMenuOpen(false);
              }}
            >
              Explore All Movies
            </Link>
            <Link
              to="/trending"
              className={`mobile-nav-item ${currentPath === "/trending" ? "active" : ""}`}
              onClick={() => {
                cinematicAudio.playClick();
                setMobileMenuOpen(false);
              }}
            >
              <Flame size={16} className="text-orange-400" />
              <span>Trending Movies</span>
            </Link>
            <Link
              to="/top-rated"
              className={`mobile-nav-item ${currentPath === "/top-rated" ? "active" : ""}`}
              onClick={() => {
                cinematicAudio.playClick();
                setMobileMenuOpen(false);
              }}
            >
              <Star size={16} className="text-amber-400" />
              <span>Top Rated Masterpieces</span>
            </Link>
            <Link
              to="/now-playing"
              className={`mobile-nav-item ${currentPath === "/now-playing" ? "active" : ""}`}
              onClick={() => {
                cinematicAudio.playClick();
                setMobileMenuOpen(false);
              }}
            >
              <Film size={16} className="text-blue-400" />
              <span>Now Playing in Theaters</span>
            </Link>
            <Link
              to="/upcoming"
              className={`mobile-nav-item ${currentPath === "/upcoming" ? "active" : ""}`}
              onClick={() => {
                cinematicAudio.playClick();
                setMobileMenuOpen(false);
              }}
            >
              <Calendar size={16} className="text-purple-400" />
              <span>Upcoming Releases</span>
            </Link>
            <Link
              to="/watchlist"
              className={`mobile-nav-item ${currentPath === "/watchlist" ? "active" : ""}`}
              onClick={() => {
                cinematicAudio.playClick();
                setMobileMenuOpen(false);
              }}
            >
              <Bookmark size={16} className="text-red-400" />
              <span>My Watchlist ({watchlistCount})</span>
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSpinReel();
              }}
              className="mobile-nav-item text-left text-amber-400"
            >
              <Sparkles size={16} className="text-amber-400" />
              <span>Cinema Roulette — Spin the Reel</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenApiKeyModal();
              }}
              className="mobile-nav-item text-left text-red-400"
            >
              <Key size={16} className="text-red-400" />
              <span>TMDB API Settings ({isLiveApi ? "Connected" : "Setup Key"})</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
