import { Outlet, Link } from "react-router-dom";
import MovingBackground from "./MovingBackground.jsx";

function Layout() {
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
    </>
  );
}

export default Layout;
