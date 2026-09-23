import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import MovingBackground from "./MovingBackground.jsx";
import WhoIsThatPokemon from "./WhoIsThatPokemon.jsx";
import TeamDrawer from "./TeamDrawer.jsx";
import { getMyTeam, saveMyTeam, sound } from "../utils.js";

function Layout() {
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [team, setTeam] = useState([]);
  const navigate = useNavigate();

  // Load team from localStorage on mount and listen to changes
  useEffect(() => {
    setTeam(getMyTeam());

    const handleStorageChange = () => {
      setTeam(getMyTeam());
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("team_updated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("team_updated", handleStorageChange);
    };
  }, []);

  const handleRemoveMember = (name) => {
    const updated = team.filter((p) => p.name.toLowerCase() !== name.toLowerCase());
    setTeam(updated);
    saveMyTeam(updated);
    window.dispatchEvent(new Event("team_updated"));
  };

  const handleRandomPokemon = () => {
    sound.playCatch();
    const randomId = Math.floor(Math.random() * 1025) + 1;
    navigate(`/pokemon/${randomId}`);
  };

  return (
    <>
      <MovingBackground />

      <div className="app">
        <header className="app-header">
          <Link to="/" className="app-title-link">
            <div className="header-brand">
              <div className="pokeball-logo-spin" aria-hidden="true">
                <div className="pokeball-top" />
                <div className="pokeball-center" />
                <div className="pokeball-bottom" />
              </div>
              <h1>PokéDex Mini</h1>
            </div>
            <div className="header-subtitle">
              <span className="live-pulse" /> Ultra Edition • 1,025 Pokémon Database
            </div>
          </Link>

          {/* Action Bar for Addictive Features */}
          <div className="header-actions-bar">
            <button
              type="button"
              className="header-pill-btn game-btn"
              onClick={() => {
                sound.playBlip();
                setIsGameOpen(true);
              }}
            >
              🎮 Who's That Pokémon?
            </button>

            <button
              type="button"
              className="header-pill-btn team-btn"
              onClick={() => {
                sound.playBlip();
                setIsTeamOpen(true);
              }}
            >
              🎒 My Party <span className="party-count-badge">{team.length}/6</span>
            </button>

            <button
              type="button"
              className="header-pill-btn random-btn"
              onClick={handleRandomPokemon}
              title="Surprise me with a random Pokémon!"
            >
              🎲 Surprise Me!
            </button>
          </div>
        </header>

        <main>
          <Outlet />
        </main>

        <footer className="app-footer">
          <p>
            Powered by <a href="https://pokeapi.co/" target="_blank" rel="noreferrer">PokéAPI</a> & GitHub Sprites. Built with React & Vite.
          </p>
        </footer>
      </div>

      {/* Mini-game Modal */}
      <WhoIsThatPokemon isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />

      {/* Party Drawer Modal */}
      <TeamDrawer
        isOpen={isTeamOpen}
        onClose={() => setIsTeamOpen(false)}
        team={team}
        onRemoveMember={handleRemoveMember}
      />
    </>
  );
}

export default Layout;
