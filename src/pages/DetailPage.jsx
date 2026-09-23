import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import confetti from "canvas-confetti";
import { API_BASE_URL } from "../config.js";
import { capitalize, TYPE_COLORS, getCryAudioUrl } from "../utils.js";

function DetailPage() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cool enhancements
  const [isShiny, setIsShiny] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef(null);

  // Fetch Pokemon details with race-condition guard
  useEffect(() => {
    let isCurrent = true;

    async function loadPokemon() {
      setIsLoading(true);
      setError(null);
      setPokemon(null);
      setIsShiny(false);

      try {
        const response = await fetch(`${API_BASE_URL}/pokemon/${name.toLowerCase()}`);
        if (!response.ok) {
          throw new Error(`No Pokémon named "${name}" — check the spelling.`);
        }
        const data = await response.json();
        if (isCurrent) {
          setPokemon(data);
        }
      } catch (err) {
        if (isCurrent) {
          setError(err.message);
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    }

    loadPokemon();

    return () => {
      isCurrent = false;
    };
  }, [name]);

  // Page title effect
  useEffect(() => {
    if (pokemon) {
      document.title = `${capitalize(pokemon.name)} (#${String(pokemon.id).padStart(3, "0")}) — PokéDex Mini`;
    } else {
      document.title = "PokéDex Mini";
    }

    return () => {
      document.title = "PokéDex Mini";
    };
  }, [pokemon]);

  // Audio cry player
  const playCry = () => {
    if (!pokemon) return;
    const cryUrl = pokemon.cries?.latest || getCryAudioUrl(pokemon.id);
    if (!audioRef.current) {
      audioRef.current = new Audio(cryUrl);
    } else {
      audioRef.current.src = cryUrl;
    }

    setIsPlayingAudio(true);
    audioRef.current.volume = 0.6;
    audioRef.current.play().catch(() => {
      setIsPlayingAudio(false);
    });

    audioRef.current.onended = () => {
      setIsPlayingAudio(false);
    };
  };

  // Shiny toggle with sparkle effect
  const toggleShiny = (e) => {
    const nextShiny = !isShiny;
    setIsShiny(nextShiny);
    if (nextShiny && e) {
      const rect = e.target.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { x, y },
        colors: ["#ffd700", "#ff69b4", "#00ffff", "#ffffff"],
      });
    }
  };

  if (isLoading) return <p className="status">Loading {name}…</p>;
  if (error) return <p className="status status-error">{error}</p>;
  if (!pokemon) return null;

  // Determine artwork / sprites
  const defaultArt =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.front_default;
  const shinyArt =
    pokemon.sprites?.other?.["official-artwork"]?.front_shiny ||
    pokemon.sprites?.front_shiny ||
    defaultArt;

  const currentArt = isShiny ? shinyArt : defaultArt;

  // Calculate Base Stat Total (BST)
  const totalStats = pokemon.stats.reduce((acc, curr) => acc + curr.base_stat, 0);

  // Stat max for bar percentage
  const maxStatCap = 255;

  const prevId = pokemon.id > 1 ? pokemon.id - 1 : null;
  const nextId = pokemon.id < 1025 ? pokemon.id + 1 : null;

  return (
    <div className="detail-page glass-panel">
      <div className="detail-top-nav">
        <Link to="/" className="back-link">
          ← Back to list
        </Link>
        <div className="detail-quick-nav">
          {prevId && (
            <Link to={`/pokemon/${prevId}`} className="quick-nav-btn prev">
              ← #{String(prevId).padStart(3, "0")}
            </Link>
          )}
          {nextId && (
            <Link to={`/pokemon/${nextId}`} className="quick-nav-btn next">
              #{String(nextId).padStart(3, "0")} →
            </Link>
          )}
        </div>
      </div>

      <div className="detail-hero">
        <div className="artwork-stage">
          <div className="artwork-glow" />
          <img
            src={currentArt}
            alt={pokemon.name}
            width={200}
            height={200}
            className={`detail-main-img ${isShiny ? "shiny-glow" : ""}`}
          />

          <div className="artwork-action-bar">
            <button
              type="button"
              className={`action-pill-btn ${isShiny ? "active-shiny" : ""}`}
              onClick={toggleShiny}
            >
              ✨ {isShiny ? "Showing Shiny" : "View Shiny"}
            </button>
            <button
              type="button"
              className={`action-pill-btn ${isPlayingAudio ? "playing" : ""}`}
              onClick={playCry}
              title="Play Pokémon in-game cry"
            >
              🔊 {isPlayingAudio ? "Playing Cry…" : "Play Cry"}
            </button>
          </div>
        </div>

        <div className="detail-header-info">
          <span className="detail-id-badge">
            #{String(pokemon.id).padStart(3, "0")}
          </span>
          <h2>{capitalize(pokemon.name)}</h2>

          {/* Standard class name for instruction compliance */}
          <p className="pokemon-types">
            {pokemon.types.map((t) => t.type.name).join(", ")}
          </p>

          <div className="type-badge-row">
            {pokemon.types.map((t) => {
              const typeName = t.type.name;
              const typeInfo = TYPE_COLORS[typeName] || TYPE_COLORS.normal;
              return (
                <span
                  key={typeName}
                  className="type-badge-pill"
                  style={{
                    backgroundColor: typeInfo.bg,
                    boxShadow: `0 0 12px ${typeInfo.glow}`,
                  }}
                >
                  {capitalize(typeName)}
                </span>
              );
            })}
          </div>

          <div className="physical-specs-grid">
            <div className="spec-card">
              <span className="spec-label">Height</span>
              <span className="spec-value">{(pokemon.height / 10).toFixed(1)} m</span>
            </div>
            <div className="spec-card">
              <span className="spec-label">Weight</span>
              <span className="spec-value">{(pokemon.weight / 10).toFixed(1)} kg</span>
            </div>
            <div className="spec-card">
              <span className="spec-label">Abilities</span>
              <span className="spec-value abilities-text">
                {pokemon.abilities
                  .map((a) => (a.is_hidden ? `${capitalize(a.ability.name)} (HA)` : capitalize(a.ability.name)))
                  .join(", ")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-container">
        <div className="stats-header-bar">
          <h3>Base Statistics</h3>
          <span className="bst-badge">Total BST: {totalStats}</span>
        </div>

        <ul className="stat-list">
          {pokemon.stats.map((s) => {
            const pct = Math.min(100, Math.round((s.base_stat / maxStatCap) * 100));
            let statColorClass = "stat-low";
            if (s.base_stat >= 110) statColorClass = "stat-hyper";
            else if (s.base_stat >= 80) statColorClass = "stat-high";
            else if (s.base_stat >= 50) statColorClass = "stat-med";

            return (
              <li key={s.stat.name}>
                <span className="stat-name">{s.stat.name}</span>
                <span className="stat-value">{s.base_stat}</span>
                <div className="stat-meter-track" aria-hidden="true">
                  <div
                    className={`stat-meter-fill ${statColorClass}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default DetailPage;
