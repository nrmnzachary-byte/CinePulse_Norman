import { useState, useEffect } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import CinemaBackground from "./components/CinemaBackground.jsx";
import ApiKeyModal from "./components/ApiKeyModal.jsx";
import CommandPalette from "./components/CommandPalette.jsx";
import SpinReelModal from "./components/SpinReelModal.jsx";
import TrailerModal from "./components/TrailerModal.jsx";
import ScrollToTopButton from "./components/ScrollToTopButton.jsx";
import HomePage from "./pages/HomePage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import WatchlistPage from "./pages/WatchlistPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function RouteScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);
  return null;
}

function App() {
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [spinReelOpen, setSpinReelOpen] = useState(false);
  const [trailerMovie, setTrailerMovie] = useState(null);

  return (
    <HashRouter>
      <RouteScrollReset />
      <div className="app-layout">
        {/* Ambient Cinema Lighting Background */}
        <CinemaBackground />

        {/* Global Navigation */}
        <Navbar
          onOpenApiKeyModal={() => setApiKeyModalOpen(true)}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onOpenSpinReel={() => setSpinReelOpen(true)}
        />

        {/* Main Routed Content */}
        <div className="app-main-content">
          <Routes>
            <Route path="/" element={<HomePage defaultCategory="trending" />} />
            <Route path="/trending" element={<HomePage defaultCategory="trending" />} />
            <Route path="/top-rated" element={<HomePage defaultCategory="top_rated" />} />
            <Route path="/now-playing" element={<HomePage defaultCategory="now_playing" />} />
            <Route path="/upcoming" element={<HomePage defaultCategory="upcoming" />} />
            <Route path="/movie/:id" element={<DetailPage />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer onOpenApiKeyModal={() => setApiKeyModalOpen(true)} />

        {/* Floating scroll-to-top */}
        <ScrollToTopButton />

        {/* Global TMDB API Key Modal */}
        <ApiKeyModal
          isOpen={apiKeyModalOpen}
          onClose={() => setApiKeyModalOpen(false)}
        />

        {/* Global Command Palette (Ctrl+K / /) */}
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          onOpenSpinReel={() => setSpinReelOpen(true)}
        />

        {/* Global Cinema Roulette Wheel Modal */}
        <SpinReelModal
          isOpen={spinReelOpen}
          onClose={() => setSpinReelOpen(false)}
          onOpenTrailer={(m) => setTrailerMovie(m)}
        />

        {/* Global Trailer Modal */}
        {trailerMovie && (
          <TrailerModal
            movie={trailerMovie}
            onClose={() => setTrailerMovie(null)}
          />
        )}
      </div>
    </HashRouter>
  );
}

export default App;
