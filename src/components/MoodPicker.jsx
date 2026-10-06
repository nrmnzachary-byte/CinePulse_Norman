import { useState, useEffect } from "react";
import {
  Sparkles,
  X,
  Laugh,
  Zap,
  Compass,
  Heart,
  Shield,
  Crown,
  Film,
} from "lucide-react";
import { cinematicAudio } from "../services/soundEngine.js";

const MOODS = [
  { icon: Laugh, label: "I want to laugh", genres: [35], vibe: "popcorn", color: "#fbbf24" },
  { icon: Zap, label: "Thrill me", genres: [27, 53], vibe: "adrenaline", color: "#e50914" },
  { icon: Compass, label: "Blow my mind", genres: [878, 12], vibe: "mind_bending", color: "#8b5cf6" },
  { icon: Heart, label: "Make me feel", genres: [18, 10749], vibe: "emotional", color: "#06b6d4" },
  { icon: Shield, label: "Dark & gritty", genres: [80, 9648], vibe: "dark_gritty", color: "#94a3b8" },
  { icon: Crown, label: "Masterpieces only", genres: [], vibe: "masterpieces", color: "#f59e0b" },
  { icon: Film, label: "Surprise me", genres: [], vibe: "all", color: "#10b981" },
];

export default function MoodPicker({ onMoodSelect, onClose }) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleSelect = (mood) => {
    cinematicAudio.playClick();
    setSelected(mood.label);
    setTimeout(() => {
      onMoodSelect({ vibe: mood.vibe, genre: mood.genres[0] || "all" });
      onClose();
    }, 400);
  };

  return (
    <div className="mood-picker-overlay" onClick={onClose}>
      <div className="mood-picker-panel" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="mood-picker-close">
          <X size={18} />
        </button>

        <div className="mood-picker-header">
          <Sparkles size={22} className="text-amber-400" />
          <h2 className="mood-picker-title">What's your mood tonight?</h2>
          <p className="mood-picker-sub">Pick a feeling — we'll find the perfect film.</p>
        </div>

        <div className="mood-grid">
          {MOODS.map((mood) => {
            const Icon = mood.icon;
            return (
              <button
                key={mood.label}
                onClick={() => handleSelect(mood)}
                className={`mood-card ${selected === mood.label ? "selected" : ""}`}
                style={{ "--mood-color": mood.color }}
              >
                <span className="mood-icon-wrapper">
                  <Icon size={24} style={{ color: mood.color }} />
                </span>
                <span className="mood-label">{mood.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
