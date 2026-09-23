import { Link } from "react-router-dom";
import { capitalize, TYPE_COLORS, sound } from "../utils.js";

export default function TeamDrawer({ isOpen, onClose, team, onRemoveMember }) {
  if (!isOpen) return null;

  const emptySlots = 6 - team.length;

  return (
    <div className="team-drawer-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="team-drawer glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title">
            <span className="party-icon">🎒</span>
            <h3>My Pokémon Party ({team.length}/6)</h3>
          </div>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Close Party Drawer">
            ✕
          </button>
        </div>

        <p className="drawer-sub">
          Your personal trainer squad! Add Pokémon from their detail page.
        </p>

        <div className="party-slots-grid">
          {team.map((member) => (
            <div key={member.id} className="party-card glass-card">
              <button
                type="button"
                className="party-remove-btn"
                onClick={() => {
                  sound.playBlip();
                  onRemoveMember(member.name);
                }}
                title="Release Pokémon"
              >
                ✕
              </button>

              <Link
                to={`/pokemon/${member.name}`}
                className="party-card-link"
                onClick={onClose}
              >
                <img
                  src={member.sprite}
                  alt={member.name}
                  className="party-sprite"
                  width={64}
                  height={64}
                />
                <span className="party-poke-id">#{String(member.id).padStart(3, "0")}</span>
                <span className="party-poke-name">{capitalize(member.name)}</span>

                <div className="party-types-mini">
                  {member.types?.map((t) => {
                    const info = TYPE_COLORS[t] || TYPE_COLORS.normal;
                    return (
                      <span
                        key={t}
                        className="mini-type-dot"
                        style={{ backgroundColor: info.bg }}
                        title={capitalize(t)}
                      />
                    );
                  })}
                </div>
              </Link>
            </div>
          ))}

          {/* Empty Party Slots */}
          {Array.from({ length: emptySlots }).map((_, idx) => (
            <div key={`empty-${idx}`} className="party-card empty-slot">
              <div className="empty-pokeball-icon">⭕</div>
              <span className="empty-label">Empty Slot</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
