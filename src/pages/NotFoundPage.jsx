import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="status not-found-card glass-panel">
      <div className="missingno-badge">Wild MissingNo. Appeared!</div>
      <div className="glitch-icon" aria-hidden="true">👾❓</div>
      <h2>404 — Area Uncharted</h2>
      <p>There's nothing here.</p>
      <Link to="/" className="back-link">
        ← Back to list
      </Link>
    </div>
  );
}

export default NotFoundPage;
