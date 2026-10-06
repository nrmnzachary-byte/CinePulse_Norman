import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard.jsx";
import { cinematicAudio } from "../services/soundEngine.js";

export default function MovieRow({ title, subtitle, icon: Icon, movies = [], onOpenTrailer }) {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    cinematicAudio.playClick();
    if (!rowRef.current) return;
    const { scrollLeft, clientWidth } = rowRef.current;
    const scrollAmount = clientWidth * 0.75;
    rowRef.current.scrollTo({
      left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  if (!movies || movies.length === 0) return null;

  return (
    <section className="movie-row-section">
      <div className="movie-row-header">
        <div className="movie-row-title-wrap">
          {Icon && <Icon size={20} className="text-amber-400" />}
          <div>
            <h2 className="movie-row-title">{title}</h2>
            {subtitle && <p className="movie-row-subtitle">{subtitle}</p>}
          </div>
        </div>

        <div className="movie-row-controls">
          <button
            onClick={() => scroll("left")}
            className="row-nav-btn"
            aria-label={`Scroll ${title} left`}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="row-nav-btn"
            aria-label={`Scroll ${title} right`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="movie-row-scroll-container" ref={rowRef}>
        <div className="movie-row-track">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-row-item">
              <MovieCard movie={movie} onOpenTrailer={onOpenTrailer} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
