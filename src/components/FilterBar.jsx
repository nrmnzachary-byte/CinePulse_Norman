import {
  Search,
  X,
  SlidersHorizontal,
  Star,
  Flame,
  Film,
  Sparkles,
  Calendar,
  RotateCcw,
  LayoutGrid,
  List,
  Compass,
  Zap,
  Crown,
  Shield,
  Heart,
  Layers,
} from "lucide-react";
import { GENRE_LIST, MOVIE_VIBES, DECADES } from "../config.js";
import { cinematicAudio } from "../services/soundEngine.js";

const VIBE_ICONS = {
  sparkles: Sparkles,
  compass: Compass,
  flame: Zap,
  crown: Crown,
  shield: Shield,
  heart: Heart,
  film: Film,
};

export default function FilterBar({
  category,
  onCategoryChange,
  trendingWindow,
  onTrendingWindowChange,
  searchQuery,
  onSearchChange,
  selectedGenre,
  onGenreChange,
  selectedVibe,
  onVibeChange,
  selectedDecade,
  onDecadeChange,
  minRating,
  onRatingChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  onResetFilters,
  totalResults,
}) {
  const hasActiveFilters =
    Boolean(searchQuery) ||
    selectedGenre !== "all" ||
    selectedVibe !== "all" ||
    selectedDecade !== "all" ||
    minRating > 0 ||
    sortBy !== "popularity.desc" ||
    category !== "trending";

  return (
    <div className="filter-bar-container">
      {/* Primary HUD Controls Row: Search + Category + Sort + Rating + Era + View */}
      <div className="search-sort-controls-row">
        {/* Instant Search Bar */}
        <div className="search-input-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search movies by title, director, or actor..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input-field"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="search-clear-btn"
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Dropdowns Group */}
        <div className="filter-dropdowns-group">
          {/* Category Dropdown (Requested by User) */}
          <div className="custom-select-wrapper category-select-wrap">
            {category === "trending" && <Flame size={14} className="select-icon text-orange-400" />}
            {category === "top_rated" && <Star size={14} className="select-icon text-amber-400" fill="currentColor" />}
            {category === "now_playing" && <Film size={14} className="select-icon text-blue-400" />}
            {category === "upcoming" && <Calendar size={14} className="select-icon text-purple-400" />}
            <select
              value={category}
              onChange={(e) => {
                cinematicAudio.playClick();
                onCategoryChange(e.target.value);
              }}
              className="custom-select font-medium"
              aria-label="Category"
            >
              <option value="trending">Trending Chart</option>
              <option value="top_rated">Top Rated Masterpieces</option>
              <option value="now_playing">Now Playing in Theaters</option>
              <option value="upcoming">Upcoming Releases</option>
            </select>
          </div>

          {/* Sort By Dropdown (Requested by User) */}
          <div className="custom-select-wrapper">
            <SlidersHorizontal size={14} className="select-icon" />
            <select
              value={sortBy}
              onChange={(e) => {
                cinematicAudio.playClick();
                onSortChange(e.target.value);
              }}
              className="custom-select font-medium"
              aria-label="Sort By"
            >
              <option value="popularity.desc">Most Popular</option>
              <option value="vote_average.desc">Highest Rated</option>
              <option value="primary_release_date.desc">Newest Release</option>
            </select>
          </div>

          {/* Era / Decade Filter */}
          <div className="custom-select-wrapper">
            <Calendar size={14} className="select-icon" />
            <select
              value={selectedDecade}
              onChange={(e) => {
                cinematicAudio.playClick();
                onDecadeChange(e.target.value);
              }}
              className="custom-select"
              aria-label="Release Era"
            >
              {DECADES.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          {/* Min Rating Dropdown */}
          <div className="custom-select-wrapper">
            <Star size={14} className="select-icon text-amber-400" />
            <select
              value={minRating}
              onChange={(e) => {
                cinematicAudio.playClick();
                onRatingChange(Number(e.target.value));
              }}
              className="custom-select"
              aria-label="Minimum Rating"
            >
              <option value={0}>All Ratings</option>
              <option value={7}>7.0+ Great</option>
              <option value={8}>8.0+ Masterpiece</option>
              <option value={8.5}>8.5+ Legendary</option>
            </select>
          </div>

          {/* Trending Time Window (When in Trending) */}
          {category === "trending" && !searchQuery && (
            <div className="time-window-toggle">
              <button
                onClick={() => onTrendingWindowChange("day")}
                className={`time-window-btn ${trendingWindow === "day" ? "active" : ""}`}
              >
                Today
              </button>
              <button
                onClick={() => onTrendingWindowChange("week")}
                className={`time-window-btn ${trendingWindow === "week" ? "active" : ""}`}
              >
                This Week
              </button>
            </div>
          )}

          {/* View Mode Toggle */}
          <div className="view-mode-toggle">
            <button
              onClick={() => {
                cinematicAudio.playClick();
                onViewModeChange("grid");
              }}
              className={`view-mode-btn ${viewMode === "grid" ? "active" : ""}`}
              title="Grid View"
              aria-label="Grid View"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => {
                cinematicAudio.playClick();
                onViewModeChange("list");
              }}
              className={`view-mode-btn ${viewMode === "list" ? "active" : ""}`}
              title="Wide List View"
              aria-label="List View"
            >
              <List size={15} />
            </button>
          </div>

          {/* Reset Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={() => {
                cinematicAudio.playClick();
                onResetFilters();
              }}
              className="btn-reset-filters"
              title="Reset all filters"
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Movie Vibes Row (Pure Lucide Icons, zero emojis, one-line nowrap) */}
      <div className="vibes-row-container">
        <span className="vibes-label">VIBE:</span>
        <div className="vibes-scroll-track">
          {MOVIE_VIBES.map((vibe) => {
            const isActive = selectedVibe === vibe.id;
            const Icon = VIBE_ICONS[vibe.iconType] || Sparkles;
            return (
              <button
                key={vibe.id}
                onClick={() => {
                  cinematicAudio.playClick();
                  onVibeChange(vibe.id);
                }}
                className={`vibe-chip ${isActive ? "active" : ""}`}
              >
                <Icon size={13} className={isActive ? "text-amber-400" : "opacity-75"} />
                <span>{vibe.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Genre Pills Reel (Compact, one-line nowrap) */}
      <div className="genre-pills-reel">
        {GENRE_LIST.map((genre) => {
          const isSelected = String(selectedGenre) === String(genre.id);
          return (
            <button
              key={genre.id}
              onClick={() => {
                cinematicAudio.playClick();
                onGenreChange(genre.id);
              }}
              className={`genre-pill-btn ${isSelected ? "active" : ""}`}
            >
              {isSelected && <Sparkles size={11} className="mr-1 inline text-amber-400" />}
              {genre.name}
            </button>
          );
        })}
      </div>

      {/* Results Header Summary (Clean icons, no emojis) */}
      {typeof totalResults === "number" && (
        <div className="filter-results-counter">
          <span className="inline-flex items-center gap-1.5">
            {category === "trending" && <Flame size={13} className="text-orange-400" />}
            {category === "top_rated" && <Star size={13} className="text-amber-400" fill="currentColor" />}
            {category === "now_playing" && <Film size={13} className="text-blue-400" />}
            {category === "upcoming" && <Calendar size={13} className="text-purple-400" />}
            <span>
              {category === "trending" && "Trending Chart"}
              {category === "top_rated" && "Highest Rated Cinema"}
              {category === "now_playing" && "Now Playing in Theaters"}
              {category === "upcoming" && "Anticipated Upcoming Releases"}
            </span>
            <span className="text-slate-500">•</span>
            <strong>{totalResults}</strong> titles available
          </span>
          {searchQuery && <span> matching "<em>{searchQuery}</em>"</span>}
        </div>
      )}
    </div>
  );
}
