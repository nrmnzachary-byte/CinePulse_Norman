import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchForm() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const name = query.trim().toLowerCase();
    if (name === "") {
      setError("Type a Pokémon name first.");
      return;
    }
    setError(null);
    navigate(`/pokemon/${name}`);
  }

  const handleQuickPick = (quickName) => {
    setQuery(quickName);
    setError(null);
    navigate(`/pokemon/${quickName.toLowerCase()}`);
  };

  const trendingPokemon = [
    { name: "Pikachu", icon: "⚡" },
    { name: "Charizard", icon: "🔥" },
    { name: "Gengar", icon: "👻" },
    { name: "Mewtwo", icon: "🔮" },
    { name: "Lucario", icon: "🥊" },
    { name: "Greninja", icon: "💧" },
    { name: "Eevee", icon: "⭐" },
    { name: "Rayquaza", icon: "🐉" },
  ];

  return (
    <div className="search">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <span className="search-icon" aria-hidden="true">🔍</span>
          <input
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              if (error) setError(null);
            }}
            placeholder="Search a Pokémon by name or ID (e.g. pikachu, 25)…"
            className="search-input"
            aria-label="Search Pokémon by name or ID"
          />
          {query && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setQuery("")}
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
        <span className="quick-label">Trending:</span>
        <div className="quick-chips">
          {trendingPokemon.map((poke) => (
            <button
              key={poke.name}
              type="button"
              className="quick-chip-btn"
              onClick={() => handleQuickPick(poke.name)}
            >
              <span>{poke.icon}</span> {poke.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
