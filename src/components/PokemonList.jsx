import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config.js";
import {
  getIdFromUrl,
  capitalize,
  getSpriteUrl,
  getOfficialArtworkUrl,
  GENERATIONS,
  TYPE_COLORS,
  sound,
} from "../utils.js";

const PAGE_SIZE = 48;

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [allGenerationList, setAllGenerationList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  // Filters
  const [selectedGen, setSelectedGen] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [filterQuery, setFilterQuery] = useState("");
  const [displayMode, setDisplayMode] = useState("artwork");
  const [page, setPage] = useState(1);

  // Initial load or Generation change
  useEffect(() => {
    let isCurrent = true;

    async function loadPokemons() {
      setIsLoading(true);
      setError(null);
      setPage(1);

      try {
        const genConfig = GENERATIONS.find((g) => g.id === selectedGen) || GENERATIONS[0];
        const limit = genConfig.id === "all" ? 1025 : genConfig.limit;
        const offset = genConfig.offset;

        // If a specific type is selected, we fetch from the type endpoint
        if (selectedType !== "all") {
          const typeResp = await fetch(`${API_BASE_URL}/type/${selectedType}`);
          if (!typeResp.ok) throw new Error(`Status ${typeResp.status}`);
          const typeData = await typeResp.json();
          let list = typeData.pokemon.map((p) => p.pokemon);

          // If generation is also filtered, filter by ID range
          if (selectedGen !== "all") {
            const minId = offset + 1;
            const maxId = offset + limit;
            list = list.filter((p) => {
              const id = parseInt(getIdFromUrl(p.url), 10);
              return id >= minId && id <= maxId;
            });
          }

          if (isCurrent) {
            setAllGenerationList(list);
            setPokemons(list.slice(0, PAGE_SIZE));
          }
        } else {
          // Standard pokemon list endpoint
          const response = await fetch(
            `${API_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
          );
          if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
          }
          const data = await response.json();
          if (isCurrent) {
            setAllGenerationList(data.results);
            setPokemons(data.results.slice(0, PAGE_SIZE));
          }
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

    loadPokemons();

    return () => {
      isCurrent = false;
    };
  }, [selectedGen, selectedType]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    sound.playBlip();
    const nextPage = page + 1;
    const endIndex = nextPage * PAGE_SIZE;
    setPokemons(allGenerationList.slice(0, endIndex));
    setPage(nextPage);
    setIsLoadingMore(false);
  };

  const handleLoadAll = () => {
    sound.playCatch();
    setPokemons(allGenerationList);
    setPage(Math.ceil(allGenerationList.length / PAGE_SIZE));
  };

  if (isLoading) {
    return <p className="status">Loading Pokémon…</p>;
  }

  if (error) {
    return (
      <p className="status status-error">
        Couldn't load the list: {error}
      </p>
    );
  }

  // Filter loaded pokemon by query
  const visiblePokemons = pokemons.filter((pokemon) => {
    if (!filterQuery) return true;
    const q = filterQuery.toLowerCase();
    const id = getIdFromUrl(pokemon.url);
    return pokemon.name.toLowerCase().includes(q) || id.includes(q);
  });

  const hasMore = pokemons.length < allGenerationList.length;

  return (
    <div className="pokemon-explorer">
      {/* Controls Bar */}
      <div className="filter-panel glass-card">
        {/* Generation Tabs */}
        <div className="gen-selector-wrapper">
          <div className="filter-title-row">
            <span className="filter-title">Generations:</span>
            <span className="gen-count-hint">Gen 1 to Gen 9 (All 1,025 Pokémon)</span>
          </div>
          <div className="gen-tabs-scroll">
            {GENERATIONS.map((gen) => (
              <button
                key={gen.id}
                type="button"
                className={`gen-tab-btn ${selectedGen === gen.id ? "active" : ""}`}
                onClick={() => {
                  sound.playBlip();
                  setSelectedGen(gen.id);
                }}
              >
                {gen.name}
              </button>
            ))}
          </div>
        </div>

        {/* Type Filter Pills */}
        <div className="type-selector-wrapper">
          <span className="filter-title">Filter By Elemental Type:</span>
          <div className="type-chips-scroll">
            <button
              type="button"
              className={`type-chip-btn ${selectedType === "all" ? "active" : ""}`}
              onClick={() => {
                sound.playBlip();
                setSelectedType("all");
              }}
            >
              🌈 All Types
            </button>
            {Object.keys(TYPE_COLORS).map((type) => {
              const info = TYPE_COLORS[type];
              return (
                <button
                  key={type}
                  type="button"
                  className={`type-chip-btn ${selectedType === type ? "active" : ""}`}
                  style={{
                    "--type-color": info.bg,
                    "--type-glow": info.glow,
                  }}
                  onClick={() => {
                    sound.playBlip();
                    setSelectedType(type);
                  }}
                >
                  <span className="type-chip-icon">{info.icon}</span> {capitalize(type)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sub filter row */}
        <div className="sub-filter-row">
          <div className="instant-filter-box">
            <span className="quick-filter-icon" aria-hidden="true">⚡</span>
            <input
              type="text"
              placeholder="Quick filter in current view (e.g. char, 006)..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="quick-filter-input"
            />
            {filterQuery && (
              <button
                type="button"
                className="filter-clear-btn"
                onClick={() => setFilterQuery("")}
              >
                ✕
              </button>
            )}
          </div>

          <div className="view-toggle-group">
            <button
              type="button"
              className={`view-toggle-btn ${displayMode === "artwork" ? "active" : ""}`}
              onClick={() => setDisplayMode("artwork")}
              title="Official 3D Artwork"
            >
              🎨 HD Artwork
            </button>
            <button
              type="button"
              className={`view-toggle-btn ${displayMode === "sprite" ? "active" : ""}`}
              onClick={() => setDisplayMode("sprite")}
              title="Classic Pixel Sprites"
            >
              👾 Sprites
            </button>
          </div>
        </div>

        <div className="counter-badge">
          Showing <strong>{visiblePokemons.length}</strong> of{" "}
          <strong>{allGenerationList.length}</strong> Pokémon
        </div>
      </div>

      {/* Main List */}
      <ul className="pokemon-list">
        {visiblePokemons.map((pokemon) => {
          const id = getIdFromUrl(pokemon.url);
          const artworkUrl = getOfficialArtworkUrl(id);
          const spriteUrl = getSpriteUrl(id);

          return (
            <li key={pokemon.name} className="pokemon-list-item">
              <Link
                to={`/pokemon/${pokemon.name}`}
                className="pokemon-link holographic-card"
                onClick={() => sound.playBlip()}
              >
                <div className="pokemon-card-art">
                  <img
                    className="pokemon-sprite"
                    src={displayMode === "artwork" ? artworkUrl : spriteUrl}
                    alt={pokemon.name}
                    width={displayMode === "artwork" ? 82 : 48}
                    height={displayMode === "artwork" ? 82 : 48}
                    loading="lazy"
                    onError={(e) => {
                      if (e.target.src !== spriteUrl) {
                        e.target.src = spriteUrl;
                      }
                    }}
                  />
                </div>

                <div className="pokemon-card-info">
                  <div className="card-id-row">
                    <span className="pokemon-id">#{id.padStart(3, "0")}</span>
                  </div>
                  <span className="pokemon-name">{capitalize(pokemon.name)}</span>
                </div>

                <div className="pokemon-card-arrow" aria-hidden="true">
                  →
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Pagination / Load More */}
      {hasMore && (
        <div className="load-more-section">
          <button
            type="button"
            className="load-more-btn"
            onClick={handleLoadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? "Loading Next…" : `Load Next ${PAGE_SIZE} Pokémon`}
          </button>
          <button
            type="button"
            className="load-all-btn"
            onClick={handleLoadAll}
          >
            Load All Remaining ({allGenerationList.length - pokemons.length})
          </button>
        </div>
      )}
    </div>
  );
}

export default PokemonList;
