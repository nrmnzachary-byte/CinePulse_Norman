import { Link } from "react-router-dom";
import { Film, ExternalLink } from "lucide-react";
import { GENRE_LIST } from "../config.js";

export default function Footer({ onGenreSelect, onOpenApiKeyModal }) {
  return (
    <footer className="cinema-footer">
      <div className="footer-glow-divider" />
      <div className="footer-container">
        {/* Top Column Grid */}
        <div className="footer-columns-grid">
          {/* Brand Info */}
          <div className="footer-brand-column">
            <Link to="/" className="footer-brand">
              <Film size={20} className="brand-film-icon" />
              <span className="brand-title">CINE<span className="brand-gradient-text">PULSE</span></span>
            </Link>
            <p className="footer-bio">
              The ultimate high-fidelity cinema atlas. Explore box-office premieres,
              legendary classics, curated collections, and official 4K trailers.
            </p>
            <div className="footer-tmdb-attribution">
              <span className="tmdb-pill-badge">POWERED BY TMDB</span>
              <p className="tmdb-disclaimer">
                This product uses the TMDB API but is not endorsed or certified by TMDB.
              </p>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="footer-column">
            <h4 className="footer-heading">Cinema Feeds</h4>
            <ul className="footer-links-list">
              <li><Link to="/">Trending Releases</Link></li>
              <li><Link to="/">Now Playing in Theaters</Link></li>
              <li><Link to="/">Top Rated of All Time</Link></li>
              <li><Link to="/">Upcoming Blockbusters</Link></li>
              <li><Link to="/watchlist">My Personal Watchlist</Link></li>
            </ul>
          </div>

          {/* Popular Genres */}
          <div className="footer-column">
            <h4 className="footer-heading">Curated Genres</h4>
            <div className="footer-genre-tags">
              {GENRE_LIST.slice(1, 10).map((g) => (
                <button
                  key={g.id}
                  onClick={() => onGenreSelect && onGenreSelect(g.id)}
                  className="footer-genre-pill"
                >
                  {g.name}
                </button>
              ))}
            </div>
          </div>

          {/* Integration & Settings */}
          <div className="footer-column">
            <h4 className="footer-heading">Developer API</h4>
            <p className="footer-text-sm">
              Connect your TMDB developer key or v4 Bearer token for instant real-time live database queries.
            </p>
            <button
              onClick={onOpenApiKeyModal}
              className="footer-btn-key"
            >
              Configure TMDB API Key
            </button>
            <div className="mt-3">
              <a
                href="https://developer.themoviedb.org/docs/getting-started"
                target="_blank"
                rel="noreferrer"
                className="footer-link-external"
              >
                TMDB Getting Started Docs <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © {new Date().getFullYear()} CinePulse. Engineered with cinematic elegance for movie lovers.
          </p>
          <div className="footer-badge-strip">
            <span className="footer-badge">React 19</span>
            <span className="footer-badge">Vite 8</span>
            <span className="footer-badge">TMDB v3 API</span>
            <span className="footer-badge">Web Audio Synth</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
