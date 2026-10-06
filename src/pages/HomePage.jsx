import { useState, useEffect, useCallback, useRef } from "react";
import HeroBanner from "../components/HeroBanner.jsx";
import FilterBar from "../components/FilterBar.jsx";
import MovieCard from "../components/MovieCard.jsx";
import MovieRow from "../components/MovieRow.jsx";
import TrailerModal from "../components/TrailerModal.jsx";
import QuickViewModal from "../components/QuickViewModal.jsx";
import MoodPicker from "../components/MoodPicker.jsx";
import {
  getTrendingMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  searchMovies,
  discoverMovies,
} from "../services/tmdbApi.js";
import { SHOWCASE_MOVIES } from "../config.js";
import { Star, Film, Flame, Calendar, Sparkles, Film as FilmIcon, ChevronDown, Brain } from "lucide-react";
import { cinematicAudio } from "../services/soundEngine.js";

export default function HomePage({ defaultCategory = "trending" }) {
  // Filter & Feed States
  const [category, setCategory] = useState(defaultCategory);
  const [trendingWindow, setTrendingWindow] = useState("week"); // 'day' | 'week'
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedVibe, setSelectedVibe] = useState("all");
  const [selectedDecade, setSelectedDecade] = useState("all");
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Data States
  const [movies, setMovies] = useState([]);
  const [spotlightMovies, setSpotlightMovies] = useState([]);
  const [topRatedRow, setTopRatedRow] = useState([]);
  const [nowPlayingRow, setNowPlayingRow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Modal States
  const [trailerMovie, setTrailerMovie] = useState(null);
  const [quickViewMovie, setQuickViewMovie] = useState(null);
  const [moodPickerOpen, setMoodPickerOpen] = useState(false);

  const exploreRef = useRef(null);
  const fetchGen = useRef(0);

  // Update category if route changes
  useEffect(() => {
    setCategory(defaultCategory);
    setSearchQuery("");
    setPage(1);
    if (defaultCategory !== "trending" && exploreRef.current) {
      setTimeout(() => {
        exploreRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [defaultCategory]);

  useEffect(() => {
    const applyGenre = (e) => {
      const genreId = e.detail?.genreId;
      if (genreId == null) return;
      setSelectedGenre(genreId);
      setSearchQuery("");
      setSelectedVibe("all");
      setPage(1);
      setTimeout(() => exploreRef.current?.scrollIntoView({ behavior: "smooth" }), 120);
    };
    window.addEventListener("cinepulse_select_genre", applyGenre);
    return () => window.removeEventListener("cinepulse_select_genre", applyGenre);
  }, []);

  // Initialize spotlight banner and curated rows once
  useEffect(() => {
    let isMounted = true;
    getTrendingMovies("week").then((data) => {
      if (isMounted && data.results.length > 0) {
        setSpotlightMovies(data.results.slice(0, 5));
      }
    });

    getTopRatedMovies().then((data) => {
      if (isMounted) setTopRatedRow(data.results);
    });

    getNowPlayingMovies().then((data) => {
      if (isMounted) setNowPlayingRow(data.results);
    });

    return () => { isMounted = false; };
  }, []);

  // Core fetch function - does NOT depend on page to avoid infinite loops
  const fetchMovies = useCallback(async (opts = {}) => {
    const { isLoadMore = false, targetPage = 1 } = opts;

    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    const gen = ++fetchGen.current;

    const mergeResults = (incoming) => {
      setMovies((prev) => {
        const combined = isLoadMore ? [...prev, ...incoming] : incoming;
        const seen = new Set();
        return combined.filter((m) => {
          if (seen.has(m.id)) return false;
          seen.add(m.id);
          return true;
        });
      });
    };

    try {
      let data;
      if (searchQuery.trim()) {
        data = await searchMovies(searchQuery, targetPage);
        if (gen !== fetchGen.current) return;
        let results = data.results;

        if (selectedGenre !== "all") {
          results = results.filter((m) =>
            m.genres?.some((g) => String(g.id) === String(selectedGenre)) ||
            m.genre_ids?.some((gid) => String(gid) === String(selectedGenre))
          );
        }
        if (minRating > 0) {
          results = results.filter((m) => (m.vote_average || 0) >= minRating);
        }

        mergeResults(results);
        setHasMore(data.total_pages ? targetPage < data.total_pages : false);
      } else if (
        selectedGenre !== "all" ||
        selectedVibe !== "all" ||
        selectedDecade !== "all" ||
        minRating > 0 ||
        sortBy !== "popularity.desc"
      ) {
        data = await discoverMovies({
          genreId: selectedGenre,
          sortBy,
          minRating,
          vibeId: selectedVibe,
          decadeId: selectedDecade,
          page: targetPage,
        });
        if (gen !== fetchGen.current) return;

        mergeResults(data.results);
        setHasMore(data.total_pages ? targetPage < data.total_pages : false);
      } else {
        switch (category) {
          case "now_playing":
            data = await getNowPlayingMovies(targetPage);
            break;
          case "top_rated":
            data = await getTopRatedMovies(targetPage);
            break;
          case "upcoming":
            data = await getUpcomingMovies(targetPage);
            break;
          case "trending":
          default:
            data = await getTrendingMovies(trendingWindow, targetPage);
            break;
        }
        if (gen !== fetchGen.current) return;

        mergeResults(data.results);
        setHasMore(data.total_pages ? targetPage < data.total_pages : false);
      }

      if (isLoadMore) {
        setPage(targetPage);
      } else {
        setPage(1);
      }
    } catch (e) {
      console.error("Error fetching movies:", e);
      if (gen !== fetchGen.current) return;
      setMovies(SHOWCASE_MOVIES);
      setHasMore(false);
    } finally {
      if (gen === fetchGen.current) {
        setLoading(false);
        setLoadingMore(false);
      }
    }
  }, [category, trendingWindow, searchQuery, selectedGenre, selectedVibe, selectedDecade, minRating, sortBy]);

  // Debounced effect for search / filters
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMovies({ isLoadMore: false, targetPage: 1 });
    }, searchQuery ? 280 : 0);

    return () => clearTimeout(timer);
  }, [category, trendingWindow, searchQuery, selectedGenre, selectedVibe, selectedDecade, minRating, sortBy]);

  // Reset filters
  const handleResetFilters = () => {
    setCategory("trending");
    setTrendingWindow("week");
    setSearchQuery("");
    setSelectedGenre("all");
    setSelectedVibe("all");
    setSelectedDecade("all");
    setMinRating(0);
    setSortBy("popularity.desc");
    setPage(1);
  };

  const handleCategorySwitch = (catId) => {
    setCategory(catId);
    setSearchQuery("");
    setSelectedGenre("all");
    setSelectedVibe("all");
    setSelectedDecade("all");
    setMinRating(0);
    setPage(1);
  };

  const handleMoodSelect = ({ vibe, genre }) => {
    setSelectedVibe(vibe || "all");
    setSelectedGenre(genre || "all");
    setSearchQuery("");
    setCategory("trending");
    setPage(1);
    // scroll down to explore
    setTimeout(() => {
      exploreRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const handleLoadMore = () => {
    cinematicAudio.playClick();
    fetchMovies({ isLoadMore: true, targetPage: page + 1 });
  };

  const CATEGORY_INFO = {
    trending: {
      icon: <Flame size={18} className="text-orange-400" />,
      badge: "flame",
      title: "Popular Films This Week",
      sub: "The most watched, reviewed, and logged films across the cinema community.",
    },
    top_rated: {
      icon: <Star size={18} className="text-emerald-400" fill="currentColor" />,
      badge: "gold",
      title: "All-Time Top Rated Films",
      sub: "Highest-rated cinematic masterpieces curated from verified ratings and critical acclaim.",
    },
    now_playing: {
      icon: <Film size={18} className="text-sky-400" />,
      badge: "blue",
      title: "Now Playing in Theaters",
      sub: "New theatrical releases and current worldwide box-office premieres.",
    },
    upcoming: {
      icon: <Calendar size={18} className="text-purple-400" />,
      badge: "purple",
      title: "Anticipated Upcoming Films",
      sub: "Upcoming festival debuts, studio releases, and highly anticipated premieres.",
    },
  };

  const catInfo = CATEGORY_INFO[category] || CATEGORY_INFO.trending;

  return (
    <div className="homepage-view">
      {/* Cinematic Hero Billboard (Spotlight) */}
      <HeroBanner
        movies={spotlightMovies.length > 0 ? spotlightMovies : SHOWCASE_MOVIES.slice(0, 5)}
        onOpenTrailer={(m) => setTrailerMovie(m)}
      />

      {/* Main Exploration Section */}
      <main className="main-content-section" id="explore" ref={exploreRef}>
        <div className="section-container">

          {/* Mood Picker CTA strip */}
          <div className="mood-cta-strip">
            <div className="mood-cta-left">
              <Brain size={18} className="text-purple-400" />
              <span className="mood-cta-text">Not sure what to watch?</span>
            </div>
            <button
              className="btn-mood-picker"
              onClick={() => {
                cinematicAudio.playClick();
                setMoodPickerOpen(true);
              }}
            >
              <Sparkles size={14} className="text-amber-400" />
              Pick by Mood
            </button>
          </div>

          {/* Category Banner Title */}
          <div className="category-view-heading-strip">
            <div className="flex items-center gap-3">
              <div className={`category-glow-badge ${catInfo.badge}`}>
                {catInfo.icon}
              </div>
              <div>
                <h2 className="category-main-title">{catInfo.title}</h2>
                <p className="category-sub-title">{catInfo.sub}</p>
              </div>
            </div>
          </div>

          {/* Filter HUD */}
          <FilterBar
            category={category}
            onCategoryChange={handleCategorySwitch}
            trendingWindow={trendingWindow}
            onTrendingWindowChange={setTrendingWindow}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
            selectedVibe={selectedVibe}
            onVibeChange={setSelectedVibe}
            selectedDecade={selectedDecade}
            onDecadeChange={setSelectedDecade}
            minRating={minRating}
            onRatingChange={setMinRating}
            sortBy={sortBy}
            onSortChange={setSortBy}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onResetFilters={handleResetFilters}
            totalResults={movies.length}
          />

          {/* Movie Grid or List Display */}
          {loading ? (
            <div className={viewMode === "list" ? "movie-list-skeleton" : "movie-grid-skeleton"}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="skeleton-movie-card" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="skeleton-poster" />
                  <div className="skeleton-lines">
                    <div className="skeleton-title" />
                    <div className="skeleton-meta" />
                  </div>
                </div>
              ))}
            </div>
          ) : movies.length > 0 ? (
            <>
              <div className={viewMode === "list" ? "movie-list-display" : "movie-grid-display"}>
                {movies.map((movie, idx) => (
                  <MovieCard
                    key={`${movie.id}-${idx}`}
                    movie={movie}
                    rank={category === "trending" && !searchQuery && selectedGenre === "all" ? idx + 1 : null}
                    viewMode={viewMode}
                    onOpenTrailer={(m) => setTrailerMovie(m)}
                    onOpenQuickView={(m) => setQuickViewMovie(m)}
                    priority={idx < 4}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="load-more-container">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="btn-load-more"
                  >
                    {loadingMore ? (
                      <span className="flex items-center gap-2">
                        <div className="cinema-spinner mini" />
                        Loading More Cinema...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <span>Discover More Titles</span>
                        <ChevronDown size={16} />
                      </span>
                    )}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="empty-movies-notice">
              <FilmIcon size={48} className="empty-film-icon" />
              <h3 className="empty-title">No Cinema Titles Matched</h3>
              <p className="empty-desc">
                We couldn't find any films matching your search or active filter criteria.
              </p>
              <button
                onClick={handleResetFilters}
                className="btn-primary-gradient mt-4"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Curated Spotlight Rows (Shown on Explore Home) */}
          {!searchQuery && selectedGenre === "all" && category === "trending" && (
            <div className="curated-sections-wrap">
              <MovieRow
                title="Top Rated Masterpieces"
                subtitle="The highest critically rated cinematic triumphs in history"
                icon={Star}
                movies={topRatedRow}
                onOpenTrailer={(m) => setTrailerMovie(m)}
              />

              <MovieRow
                title="Now Playing in Theaters"
                subtitle="Current big screen releases and box office hits"
                icon={Film}
                movies={nowPlayingRow}
                onOpenTrailer={(m) => setTrailerMovie(m)}
              />
            </div>
          )}
        </div>
      </main>

      {/* Trailer Video Player Modal */}
      {trailerMovie && (
        <TrailerModal
          movie={trailerMovie}
          onClose={() => setTrailerMovie(null)}
        />
      )}

      {/* Quick Look Preview Modal */}
      {quickViewMovie && (
        <QuickViewModal
          movie={quickViewMovie}
          onClose={() => setQuickViewMovie(null)}
          onOpenTrailer={(m) => setTrailerMovie(m)}
        />
      )}

      {/* Mood Picker Modal */}
      {moodPickerOpen && (
        <MoodPicker
          onMoodSelect={handleMoodSelect}
          onClose={() => setMoodPickerOpen(false)}
        />
      )}
    </div>
  );
}
