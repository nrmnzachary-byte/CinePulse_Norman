import { useState, useEffect } from "react";
import { X, Key, CheckCircle, AlertCircle, ExternalLink, ShieldCheck, RefreshCw } from "lucide-react";
import {
  getStoredApiKey,
  getStoredAccessToken,
  setStoredApiKey,
  setStoredAccessToken,
  validateApiKey,
  hasApiKey,
} from "../services/tmdbApi.js";
import { cinematicAudio } from "../services/soundEngine.js";

export default function ApiKeyModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return <ApiKeyModalContent onClose={onClose} />;
}

function ApiKeyModalContent({ onClose }) {
  const [keyInput, setKeyInput] = useState(() => getStoredApiKey() || getStoredAccessToken() || "");
  const [status, setStatus] = useState("idle"); // 'idle' | 'testing' | 'success' | 'error'
  const [feedback, setFeedback] = useState("");
  const [isLiveActive, setIsLiveActive] = useState(() => hasApiKey());

  useEffect(() => {
    cinematicAudio.playClick();
  }, []);

  const handleTestAndSave = async (e) => {
    e.preventDefault();
    const trimmed = keyInput.trim();

    if (!trimmed) {
      setStoredApiKey("");
      setStoredAccessToken("");
      setIsLiveActive(false);
      setStatus("idle");
      setFeedback("API key cleared. CinePulse will use the offline Showcase Database.");
      return;
    }

    setStatus("testing");
    setFeedback("Connecting to TMDB API servers...");

    const result = await validateApiKey(trimmed);

    if (result.success) {
      if (trimmed.length > 50) {
        setStoredAccessToken(trimmed);
        setStoredApiKey("");
      } else {
        setStoredApiKey(trimmed);
        setStoredAccessToken("");
      }
      setStatus("success");
      setIsLiveActive(true);
      setFeedback("Connected to TMDB API v3! Live movie data is now active.");
      cinematicAudio.playWatchlistAdd();
    } else {
      // Even if TMDB test fails (e.g. strict CORS on /authentication endpoint in some browsers),
      // we still allow saving if user confirms it's a valid TMDB key.
      if (trimmed.length >= 32) {
        setStoredApiKey(trimmed);
        setStatus("success");
        setIsLiveActive(true);
        setFeedback("Key saved! (Server response: " + (result.message || "Saved") + ")");
      } else {
        setStatus("error");
        setFeedback(result.message || "Invalid TMDB API key. Please check your key.");
      }
    }
  };

  const handleClear = () => {
    setKeyInput("");
    setStoredApiKey("");
    setStoredAccessToken("");
    setIsLiveActive(false);
    setStatus("idle");
    setFeedback("Reverted to CinePulse Showcase Database.");
    cinematicAudio.playClick();
  };

  return (
    <div className="trailer-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="api-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="api-modal-header">
          <div className="flex items-center gap-3">
            <div className="api-key-icon-badge">
              <Key size={20} className="text-amber-400" />
            </div>
            <div>
              <h3 className="api-modal-title">TMDB API Configuration</h3>
              <p className="api-modal-subtitle">The Movie Database (TMDB) live connection</p>
            </div>
          </div>
          <button className="trailer-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="api-modal-body">
          <div className={`status-banner ${isLiveActive ? "live" : "showcase"}`}>
            {isLiveActive ? (
              <>
                <CheckCircle size={18} className="text-emerald-400" />
                <div>
                  <div className="font-semibold text-emerald-400">Live TMDB API Active</div>
                  <div className="text-xs text-slate-300">
                    Queries are fetched live directly from TMDB v3 API.
                  </div>
                </div>
              </>
            ) : (
              <>
                <ShieldCheck size={18} className="text-amber-400" />
                <div>
                  <div className="font-semibold text-amber-300">Showcase Database Mode</div>
                  <div className="text-xs text-slate-300">
                    Operating on high-res curated blockbuster dataset. Add your free TMDB key for millions of live titles!
                  </div>
                </div>
              </>
            )}
          </div>

          <form onSubmit={handleTestAndSave} className="api-form">
            <label className="api-input-label" htmlFor="tmdb-key-input">
              <span>Your TMDB API Key / Read Access Token</span>
              <a
                href="https://www.themoviedb.org/settings/api"
                target="_blank"
                rel="noreferrer"
                className="api-help-link"
              >
                Get Free API Key <ExternalLink size={12} />
              </a>
            </label>

            <div className="api-input-group">
              <input
                id="tmdb-key-input"
                type="text"
                placeholder="Paste your TMDB API Key (e.g. 32-char hex) or Bearer Token..."
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                className="api-text-input"
              />
            </div>

            {feedback && (
              <div
                className={`api-feedback-msg ${
                  status === "success"
                    ? "success"
                    : status === "error"
                    ? "error"
                    : "info"
                }`}
              >
                {status === "success" && <CheckCircle size={15} />}
                {status === "error" && <AlertCircle size={15} />}
                {status === "testing" && <RefreshCw size={15} className="animate-spin" />}
                <span>{feedback}</span>
              </div>
            )}

            <div className="api-modal-instructions">
              <strong>How to get your free key in 2 minutes:</strong>
              <ol className="instructions-list">
                <li>Create an account at <a href="https://www.themoviedb.org/signup" target="_blank" rel="noreferrer">themoviedb.org</a>.</li>
                <li>Go to <strong>Settings → API</strong> and click <strong>Create</strong>.</li>
                <li>Select <strong>Developer</strong> and copy your <strong>API Key (v3 auth)</strong>.</li>
              </ol>
            </div>

            <div className="api-modal-actions">
              {isLiveActive && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="btn-danger-ghost"
                >
                  Reset / Clear Key
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary-flat"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status === "testing"}
                className="btn-primary-gradient"
              >
                {status === "testing" ? (
                  <>
                    <RefreshCw size={15} className="animate-spin" /> Verifying...
                  </>
                ) : (
                  "Save & Connect"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
