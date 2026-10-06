import { Link } from "react-router-dom";
import { Film, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="not-found-container">
      <div className="not-found-card">
        <div className="not-found-icon-wrap">
          <Film size={54} className="text-amber-400" />
        </div>
        <span className="not-found-code">404</span>
        <h1 className="not-found-title">Scene Not Found</h1>
        <p className="not-found-desc">
          The cinema archive you are looking for has either been moved, deleted,
          or does not exist in the TMDB catalogue.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn-primary-gradient">
            <Home size={16} /> Return to Cinema Atlas
          </Link>
        </div>
      </div>
    </div>
  );
}
