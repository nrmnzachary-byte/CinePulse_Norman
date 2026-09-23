import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sound } from "../utils.js";

function SearchForm() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const name = query.trim().toLowerCase();
    if (name === "") {
      setError("Type a Pokémon name first.");
      sound.playBlip();
      return;
    }
    setError(null);
    sound.playCatch();
    navigate(`/pokemon/${name}`);
  }

  const handleQuickPick = (quickName) => {
    setQuery(quickName);
    setError(null);
    sound.playCatch();
    navigate(`/pokemon/${quickName.toLowerCase()}`);
  };

  const trendingPokemon = [
    { name: "Pikachu", icon: "⚡", color: "#eab308" },
    { name: "Charizard", icon: "🔥", color: "#ff5722" },
    { name: "Gengar", icon: "👻", color: "#6366f1" },
    { name: "Mewtwo", icon: "🔮", color: "#ec4899" },
    { name: "Lucario", icon: "🥊", color: "#0ea5e9" },
    { name: "Greninja", icon: "💧", color: "#0284c7" },
    { name: "Eevee", icon: "⭐", color: "#d97706" },
    { name: "Rayquaza", icon: "🐉", color: "#22c55e" },
  ];

  return (
    <div className="search">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <span className="search-icon" aria-hidden="true">
            🔍
          </span>
          <input
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              if (error) setError(null);
            }}
            placeholder="Search by Pokémon name or Pokédex # (e.g. pikachu, 25)…"
            className="search-input"
            aria-label="Search Pokémon by name or ID"
          />
          {query && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => {
                setQuery("");
                sound.playBlip();
              }}
              aria-label="Clear search input"
            >
              ✕
            </button>
          )}
        </div>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <p className="status status-error">{error}</p>}

      <div className="quick-suggestions">
        <span className="quick-label">🔥 Trending:</span>
        <div className="quick-chips">
          {trendingPokemon.map((poke) => (
            <button
              key={poke.name}
              type="button"
              className="quick-chip-btn"
              style={{ "--chip-color": poke.color }}
              onClick={() => handleQuickPick(poke.name)}
            >
              <span className="chip-icon">{poke.icon}</span> {poke.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
