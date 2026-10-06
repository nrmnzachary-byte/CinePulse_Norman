// TMDB API Configuration & Showcase Database
export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

export const IMAGE_SIZES = {
  poster: {
    small: "w342",
    medium: "w500",
    large: "w780",
    original: "original",
  },
  backdrop: {
    medium: "w780",
    large: "w1280",
    original: "original",
  },
  profile: {
    small: "w185",
    medium: "h632",
    original: "original",
  },
};

import {
  ACTOR_PLACEHOLDER,
  POSTER_PLACEHOLDER,
  BACKDROP_PLACEHOLDER,
} from "./assets/placeholders.js";

export function getPosterUrl(path, size = "w500") {
  if (!path) return POSTER_PLACEHOLDER;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

export function getBackdropUrl(path, size = "w1280") {
  if (!path) return BACKDROP_PLACEHOLDER;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

export function getPosterSrcSet(path) {
  if (!path || path.startsWith("http") || path.startsWith("data:")) return undefined;
  return `${getPosterUrl(path, "w185")} 185w, ${getPosterUrl(path, "w342")} 342w, ${getPosterUrl(path, "w500")} 500w`;
}

export function getProfileUrl(path, size = "w185") {
  if (!path) return ACTOR_PLACEHOLDER;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}


export const GENRE_MAP = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

export const GENRE_LIST = [
  { id: "all", name: "All Genres" },
  { id: 28, name: "Action" },
  { id: 878, name: "Sci-Fi" },
  { id: 18, name: "Drama" },
  { id: 12, name: "Adventure" },
  { id: 53, name: "Thriller" },
  { id: 16, name: "Animation" },
  { id: 80, name: "Crime" },
  { id: 35, name: "Comedy" },
  { id: 14, name: "Fantasy" },
  { id: 27, name: "Horror" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
];

export const MOVIE_VIBES = [
  { id: "all", label: "All Vibes", iconType: "sparkles" },
  { id: "mind_bending", label: "Mind Benders & Sci-Fi", iconType: "compass", genreIds: [878, 9648] },
  { id: "adrenaline", label: "Adrenaline & Action", iconType: "flame", genreIds: [28, 12, 53] },
  { id: "masterpieces", label: "Epic Masterpieces", iconType: "crown", minRating: 8.7 },
  { id: "dark_gritty", label: "Dark & Crime Noir", iconType: "shield", genreIds: [80, 53] },
  { id: "emotional", label: "Emotional & Drama", iconType: "heart", genreIds: [18] },
  { id: "popcorn", label: "Fun & Animation", iconType: "film", genreIds: [16, 35] },
];

export const DECADES = [
  { id: "all", label: "All Eras" },
  { id: "2020s", label: "2020s Modern", startYear: 2020, endYear: 2029 },
  { id: "2010s", label: "2010s Blockbusters", startYear: 2010, endYear: 2019 },
  { id: "2000s", label: "2000s Golden Era", startYear: 2000, endYear: 2009 },
  { id: "classic", label: "Classic Cinema (<2000)", startYear: 1900, endYear: 1999 },
];

// Rich, high-fidelity real TMDB movie records used in Showcase Mode
// (Ensures instant, flawless presentation out-of-the-box before/without API key)
export const SHOWCASE_MOVIES = [
  // 1. The Shawshank Redemption
  {
    id: 278,
    title: "The Shawshank Redemption",
    original_title: "The Shawshank Redemption",
    tagline: "Fear can hold you prisoner. Hope can set you free.",
    overview: "Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden and forms an enduring friendship with fellow inmate Red.",
    release_date: "1994-09-23",
    vote_average: 9.3,
    vote_count: 27000,
    popularity: 820.4,
    runtime: 142,
    poster_path: "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
    backdrop_path: "/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg",
    genre_ids: [18, 80],
    genres: [{ id: 18, name: "Drama" }, { id: 80, name: "Crime" }],
    trailer_key: "PLl99DlL6b4",
    status: "Released",
    budget: 25000000,
    revenue: 58500000,
    director: "Frank Darabont",
    featured: false,
    category: ["top_rated"],
    cast: [
      { id: 504, name: "Tim Robbins", character: "Andy Dufresne", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/61/Tim_Robbins_%28Berlin_Film_Festival_2013%29.jpg/330px-Tim_Robbins_%28Berlin_Film_Festival_2013%29.jpg" },
      { id: 192, name: "Morgan Freeman", character: "Ellis Boyd 'Red' Redding", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/42/Morgan_Freeman_at_The_Pentagon_on_2_August_2023_-_230802-D-PM193-3363_%28cropped%29.jpg/330px-Morgan_Freeman_at_The_Pentagon_on_2_August_2023_-_230802-D-PM193-3363_%28cropped%29.jpg" },
      { id: 4029, name: "Bob Gunton", character: "Warden Samuel Norton", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/Bob_Gunton_2015.jpg/330px-Bob_Gunton_2015.jpg" },
    ],
  },
  // 2. The Godfather
  {
    id: 238,
    title: "The Godfather",
    original_title: "The Godfather",
    tagline: "An offer you can't refuse.",
    overview: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers.",
    release_date: "1972-03-14",
    vote_average: 9.2,
    vote_count: 20200,
    popularity: 790.0,
    runtime: 175,
    poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdrop_path: "/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg",
    genre_ids: [18, 80],
    genres: [{ id: 18, name: "Drama" }, { id: 80, name: "Crime" }],
    trailer_key: "sY1S34973zA",
    status: "Released",
    budget: 6000000,
    revenue: 245066411,
    director: "Francis Ford Coppola",
    featured: false,
    category: ["top_rated"],
    cast: [
      { id: 3084, name: "Marlon Brando", character: "Don Vito Corleone", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/53/Marlon_Brando_publicity_for_One-Eyed_Jacks.png/330px-Marlon_Brando_publicity_for_One-Eyed_Jacks.png" },
      { id: 1158, name: "Al Pacino", character: "Michael Corleone", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/Al_Pacino_-_Killing_Castro_-_Q%26A_-_Tribeca_2026_-_by_%40JJxFile-23_%28cropped%29.jpg/330px-Al_Pacino_-_Killing_Castro_-_Q%26A_-_Tribeca_2026_-_by_%40JJxFile-23_%28cropped%29.jpg" },
      { id: 3085, name: "James Caan", character: "Sonny Corleone", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/James_Caan_Cannes_2013.jpg/330px-James_Caan_Cannes_2013.jpg" },
    ],
  },
  // 3. The Dark Knight
  {
    id: 155,
    title: "The Dark Knight",
    original_title: "The Dark Knight",
    tagline: "Why so serious?",
    overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.",
    release_date: "2008-07-16",
    vote_average: 9.0,
    vote_count: 32000,
    popularity: 910.4,
    runtime: 152,
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg",
    genre_ids: [18, 28, 80, 53],
    genres: [{ id: 18, name: "Drama" }, { id: 28, name: "Action" }, { id: 80, name: "Crime" }],
    trailer_key: "EXeTwQWrcwY",
    status: "Released",
    budget: 185000000,
    revenue: 1004558444,
    director: "Christopher Nolan",
    featured: true,
    category: ["top_rated", "trending"],
    cast: [
      { id: 3894, name: "Christian Bale", character: "Bruce Wayne / Batman", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0a/Christian_Bale-7837.jpg/330px-Christian_Bale-7837.jpg" },
      { id: 1810, name: "Heath Ledger", character: "Joker", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ea/Heath_Ledger_%282%29.jpg/330px-Heath_Ledger_%282%29.jpg" },
      { id: 3895, name: "Michael Caine", character: "Alfred Pennyworth", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/Michael_Caine_-_Karlovy_Vary_International_Film_Festival_2021_%28cropped%29.jpg/330px-Michael_Caine_-_Karlovy_Vary_International_Film_Festival_2021_%28cropped%29.jpg" },
      { id: 64, name: "Gary Oldman", character: "Jim Gordon", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/Gary_Oldman_Cannes_2018.jpg/330px-Gary_Oldman_Cannes_2018.jpg" },
    ],
  },
  // 4. Interstellar
  {
    id: 157336,
    title: "Interstellar",
    original_title: "Interstellar",
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    release_date: "2014-11-05",
    vote_average: 8.9,
    vote_count: 34500,
    popularity: 870.0,
    runtime: 169,
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop_path: "/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    genre_ids: [12, 18, 878],
    genres: [{ id: 12, name: "Adventure" }, { id: 18, name: "Drama" }, { id: 878, name: "Sci-Fi" }],
    trailer_key: "zSWdZVtXT7E",
    status: "Released",
    budget: 165000000,
    revenue: 701729206,
    director: "Christopher Nolan",
    featured: true,
    category: ["top_rated", "trending"],
    cast: [
      { id: 10297, name: "Matthew McConaughey", character: "Joseph Cooper", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0d/Matthew_McConaughey_at_the_2025_Toronto_Film_Festival_%283x4_cropped%29.jpg/330px-Matthew_McConaughey_at_the_2025_Toronto_Film_Festival_%283x4_cropped%29.jpg" },
      { id: 1813, name: "Anne Hathaway", character: "Dr. Amelia Brand", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a5/AnneHathaway-byPhilipRomano-Crop.jpg/330px-AnneHathaway-byPhilipRomano-Crop.jpg" },
      { id: 83002, name: "Jessica Chastain", character: "Murphy Cooper", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/Jessica_Chastain_Cannes_2021.jpg/330px-Jessica_Chastain_Cannes_2021.jpg" },
    ],
  },
  // 5. Dune: Part Two
  {
    id: 693134,
    title: "Dune: Part Two",
    original_title: "Dune: Part Two",
    tagline: "Long live the fighters.",
    overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.",
    release_date: "2024-02-27",
    vote_average: 8.6,
    vote_count: 5120,
    popularity: 980.5,
    runtime: 166,
    poster_path: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    backdrop_path: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    genre_ids: [878, 12],
    genres: [{ id: 878, name: "Sci-Fi" }, { id: 12, name: "Adventure" }],
    trailer_key: "Way9Dexny3w",
    status: "Released",
    budget: 190000000,
    revenue: 714444358,
    director: "Denis Villeneuve",
    featured: true,
    category: ["trending", "now_playing", "top_rated"],
    cast: [
      { id: 1190668, name: "Timothée Chalamet", character: "Paul Atreides", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5c/Timoth%C3%A9e_Chalamet-63482_%28cropped%29.jpg/330px-Timoth%C3%A9e_Chalamet-63482_%28cropped%29.jpg" },
      { id: 505710, name: "Zendaya", character: "Chani", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5a/Zendaya-byPhilipRomano.jpg/330px-Zendaya-byPhilipRomano.jpg" },
      { id: 933238, name: "Rebecca Ferguson", character: "Lady Jessica", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cd/Rebecca_Ferguson_2018.jpg/330px-Rebecca_Ferguson_2018.jpg" },
      { id: 17328, name: "Javier Bardem", character: "Stilgar", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d0/Javier_Bardem_-_Bunker_-_TIFF_2026-12.jpg/330px-Javier_Bardem_-_Bunker_-_TIFF_2026-12.jpg" },
    ],
  },
  // 6. Oppenheimer
  {
    id: 872585,
    title: "Oppenheimer",
    original_title: "Oppenheimer",
    tagline: "The world forever changes.",
    overview: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II, examining the moral weight, political trials, and scientific triumphs that shaped the modern nuclear age.",
    release_date: "2023-07-19",
    vote_average: 8.5,
    vote_count: 8940,
    popularity: 860.3,
    runtime: 180,
    poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    backdrop_path: "/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
    genre_ids: [18, 36],
    genres: [{ id: 18, name: "Drama" }, { id: 36, name: "History" }],
    trailer_key: "uYPbbksJxIg",
    status: "Released",
    budget: 100000000,
    revenue: 957000000,
    director: "Christopher Nolan",
    featured: true,
    category: ["trending", "top_rated"],
    cast: [
      { id: 2037, name: "Cillian Murphy", character: "J. Robert Oppenheimer", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Cillian_Murphy_at_the_London_premier_of_Steve_in_September_2025_%28cropped%29.jpg/330px-Cillian_Murphy_at_the_London_premier_of_Steve_in_September_2025_%28cropped%29.jpg" },
      { id: 5081, name: "Emily Blunt", character: "Kitty Oppenheimer", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/45/Emily_Blunt_at_WWD_Style_Awards_2026-02.jpg/330px-Emily_Blunt_at_WWD_Style_Awards_2026-02.jpg" },
      { id: 3223, name: "Robert Downey Jr.", character: "Lewis Strauss", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a9/RobertDowneyJr-byPhilipRomano7_%28cropped%29.jpg/330px-RobertDowneyJr-byPhilipRomano7_%28cropped%29.jpg" },
    ],
  },
  // 7. Spider-Man: Across the Spider-Verse
  {
    id: 569094,
    title: "Spider-Man: Across the Spider-Verse",
    original_title: "Spider-Man: Across the Spider-Verse",
    tagline: "It's how you wear the mask that matters.",
    overview: "After reuniting with Gwen Stacy, Brooklyn's full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the Spider Society, a team of Spider-People charged with protecting the Multiverse's very existence.",
    release_date: "2023-05-31",
    vote_average: 8.8,
    vote_count: 6700,
    popularity: 840.1,
    runtime: 140,
    poster_path: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    backdrop_path: "/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
    genre_ids: [16, 28, 878],
    genres: [{ id: 16, name: "Animation" }, { id: 28, name: "Action" }, { id: 878, name: "Sci-Fi" }],
    trailer_key: "cqGjhVJWtEg",
    status: "Released",
    budget: 100000000,
    revenue: 690516673,
    director: "Joaquim Dos Santos, Kemp Powers",
    featured: true,
    category: ["trending", "top_rated"],
    cast: [
      { id: 587506, name: "Shameik Moore", character: "Miles Morales (voice)", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/Shameik_Moore_Photo_Op_GalaxyCon_Raleigh_2023.jpg/330px-Shameik_Moore_Photo_Op_GalaxyCon_Raleigh_2023.jpg" },
      { id: 1305610, name: "Hailee Steinfeld", character: "Gwen Stacy (voice)", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/Hailee_Steinfeld_by_Gage_Skidmore.jpg/330px-Hailee_Steinfeld_by_Gage_Skidmore.jpg" },
      { id: 74213, name: "Oscar Isaac", character: "Miguel O'Hara (voice)", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/19/Oscar_Isaac_by_Gage_Skidmore.jpg/330px-Oscar_Isaac_by_Gage_Skidmore.jpg" },
    ],
  },
  // 8. Spirited Away
  {
    id: 129,
    title: "Spirited Away",
    original_title: "千と千尋の神隠し",
    tagline: "The tunnel led Chihiro to a mysterious world...",
    overview: "A young girl, Chihiro, becomes trapped in a strange world of spirits. After her parents are transformed into giant pigs, Chihiro must work in a luxury bathhouse for gods and spirits to find a way to free herself and her family.",
    release_date: "2001-07-20",
    vote_average: 8.9,
    vote_count: 16200,
    popularity: 780.5,
    runtime: 125,
    poster_path: "/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    backdrop_path: "/bXNvzjYE9rvBA0LXPjhFv2I3x1o.jpg",
    genre_ids: [16, 14, 12],
    genres: [{ id: 16, name: "Animation" }, { id: 14, name: "Fantasy" }, { id: 12, name: "Adventure" }],
    trailer_key: "ByXuk9QqQkk",
    status: "Released",
    budget: 19000000,
    revenue: 395580000,
    director: "Hayao Miyazaki",
    featured: false,
    category: ["top_rated"],
    cast: [
      { id: 19588, name: "Daveigh Chase", character: "Chihiro Ogino (voice)", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a5/Daveigh_Chase_LF_adjusted.jpg/330px-Daveigh_Chase_LF_adjusted.jpg" },
      { id: 19589, name: "Jason Marsden", character: "Haku (voice)", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0d/Jason_Marsden_%2853284383342%29.jpg/330px-Jason_Marsden_%2853284383342%29.jpg" },
      { id: 608, name: "Hayao Miyazaki", character: "Director / Writer", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/HayaoMiyazakiCCJuly09.jpg/330px-HayaoMiyazakiCCJuly09.jpg" },
    ],
  },
  // 9. Parasite
  {
    id: 496243,
    title: "Parasite",
    original_title: "기생충",
    tagline: "Act like you own the place.",
    overview: "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
    release_date: "2019-05-30",
    vote_average: 8.9,
    vote_count: 17800,
    popularity: 740.1,
    runtime: 133,
    poster_path: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    backdrop_path: "/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg",
    genre_ids: [35, 53, 18],
    genres: [{ id: 35, name: "Comedy" }, { id: 53, name: "Thriller" }, { id: 18, name: "Drama" }],
    trailer_key: "5xH0R_uie1U",
    status: "Released",
    budget: 11400000,
    revenue: 263100000,
    director: "Bong Joon-ho",
    featured: false,
    category: ["top_rated"],
    cast: [
      { id: 20738, name: "Song Kang-ho", character: "Kim Ki-taek", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/Song_Kang-ho_2019.jpg/330px-Song_Kang-ho_2019.jpg" },
      { id: 104473, name: "Lee Sun-kyun", character: "Park Dong-ik", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Lee_Seon-gun_in_Oct_2018.png/330px-Lee_Seon-gun_in_Oct_2018.png" },
    ],
  },
  // 10. Inception
  {
    id: 27205,
    title: "Inception",
    original_title: "Inception",
    tagline: "Your mind is the scene of the crime.",
    overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets, is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
    release_date: "2010-07-15",
    vote_average: 8.7,
    vote_count: 35000,
    popularity: 810.0,
    runtime: 148,
    poster_path: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    genre_ids: [28, 878, 12],
    genres: [{ id: 28, name: "Action" }, { id: 878, name: "Sci-Fi" }, { id: 12, name: "Adventure" }],
    trailer_key: "YoHD9XEInc0",
    status: "Released",
    budget: 160000000,
    revenue: 836836967,
    director: "Christopher Nolan",
    featured: false,
    category: ["top_rated"],
    cast: [
      { id: 6193, name: "Leonardo DiCaprio", character: "Dom Cobb", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2d/LeoPTABFI191125-28_%28cropped%29.jpg/330px-LeoPTABFI191125-28_%28cropped%29.jpg" },
      { id: 24045, name: "Joseph Gordon-Levitt", character: "Arthur", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/01/Joseph_Gordon_Levitt_Sundance_Film_Festival_2026_%28cropped%29.jpg/330px-Joseph_Gordon_Levitt_Sundance_Film_Festival_2026_%28cropped%29.jpg" },
    ],
  },
  // 11. Pulp Fiction
  {
    id: 680,
    title: "Pulp Fiction",
    original_title: "Pulp Fiction",
    tagline: "Just because you are a character doesn't mean that you have character.",
    overview: "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in four tales of violence and redemption in Los Angeles.",
    release_date: "1994-09-10",
    vote_average: 8.9,
    vote_count: 26000,
    popularity: 760.8,
    runtime: 154,
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdrop_path: "/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
    genre_ids: [53, 80],
    genres: [{ id: 53, name: "Thriller" }, { id: 80, name: "Crime" }],
    trailer_key: "s7EdQ4FqbhY",
    status: "Released",
    budget: 8000000,
    revenue: 213928762,
    director: "Quentin Tarantino",
    featured: false,
    category: ["top_rated"],
    cast: [
      { id: 8891, name: "John Travolta", character: "Vincent Vega", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/John_Travolta_in_2024_%28cropped%29.jpg/330px-John_Travolta_in_2024_%28cropped%29.jpg" },
      { id: 2231, name: "Samuel L. Jackson", character: "Jules Winnfield", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/Samuel_L._Jackson_attending_the_World_premier_of_%22Argylle%22_in_London_%2C_January_2024_%28cropped2%29.jpg/330px-Samuel_L._Jackson_attending_the_World_premier_of_%22Argylle%22_in_London_%2C_January_2024_%28cropped2%29.jpg" },
      { id: 139, name: "Uma Thurman", character: "Mia Wallace", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/11/Uma_Thurman_Cannes_2017.jpg/330px-Uma_Thurman_Cannes_2017.jpg" },
    ],
  },
  // 12. Deadpool & Wolverine
  {
    id: 533535,
    title: "Deadpool & Wolverine",
    original_title: "Deadpool & Wolverine",
    tagline: "Come together.",
    overview: "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
    release_date: "2024-07-24",
    vote_average: 8.2,
    vote_count: 4890,
    popularity: 990.8,
    runtime: 128,
    poster_path: "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    backdrop_path: "/628Dep6AxEtDxjZoGP78TsOxYbK.jpg",
    genre_ids: [28, 35, 878],
    genres: [{ id: 28, name: "Action" }, { id: 35, name: "Comedy" }, { id: 878, name: "Sci-Fi" }],
    trailer_key: "73_1biulkYk",
    status: "Released",
    budget: 200000000,
    revenue: 1337000000,
    director: "Shawn Levy",
    featured: true,
    category: ["now_playing", "trending"],
    cast: [
      { id: 10859, name: "Ryan Reynolds", character: "Wade Wilson / Deadpool", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/14/Deadpool_2_Japan_Premiere_Red_Carpet_Ryan_Reynolds_%28cropped%29.jpg/330px-Deadpool_2_Japan_Premiere_Red_Carpet_Ryan_Reynolds_%28cropped%29.jpg" },
      { id: 6968, name: "Hugh Jackman", character: "Logan / Wolverine", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d8/Hugh_Jackman_Is_This_Thing_On-68_%28cropped%29.jpg/330px-Hugh_Jackman_Is_This_Thing_On-68_%28cropped%29.jpg" },
    ],
  },
  // 13. Furiosa: A Mad Max Saga
  {
    id: 786892,
    title: "Furiosa: A Mad Max Saga",
    original_title: "Furiosa: A Mad Max Saga",
    tagline: "Out of the fire, she was forged.",
    overview: "As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus. Sweeping through the Wasteland, they come across the Citadel presided over by The Immortan Joe.",
    release_date: "2024-05-22",
    vote_average: 7.9,
    vote_count: 3200,
    popularity: 710.6,
    runtime: 148,
    poster_path: "/wNAhuOZ3Zf84jCIlrcI6JhgmY5q.jpg",
    backdrop_path: "/wNAhuOZ3Zf84jCIlrcI6JhgmY5q.jpg",
    genre_ids: [28, 12, 878],
    genres: [{ id: 28, name: "Action" }, { id: 12, name: "Adventure" }, { id: 878, name: "Sci-Fi" }],
    trailer_key: "XJMuhwVlca4",
    status: "Released",
    budget: 168000000,
    revenue: 172800000,
    director: "George Miller",
    featured: false,
    category: ["now_playing", "trending"],
    cast: [
      { id: 1399476, name: "Anya Taylor-Joy", character: "Imperator Furiosa", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7a/Anya_Taylor-Joy_at_the_2025_Toronto_International_Film_Festival._07_%28cropped%29.jpg/330px-Anya_Taylor-Joy_at_the_2025_Toronto_International_Film_Festival._07_%28cropped%29.jpg" },
      { id: 74568, name: "Chris Hemsworth", character: "Dementus", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/86/Chris_Hemsworth_-_Crime_101.jpg/330px-Chris_Hemsworth_-_Crime_101.jpg" },
    ],
  },
  // 14. Gladiator II
  {
    id: 558449,
    title: "Gladiator II",
    original_title: "Gladiator II",
    tagline: "What we do in life echoes in eternity.",
    overview: "Years after witnessing the death of the revered hero Maximus at the hands of his uncle, Lucius must enter the Colosseum after his home is conquered by the tyrannical Emperors who now lead Rome with an iron fist.",
    release_date: "2024-11-13",
    vote_average: 8.1,
    vote_count: 2450,
    popularity: 880.0,
    runtime: 148,
    poster_path: "/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",
    backdrop_path: "/euYIwmwkmz95mnExrPy4vSj2V4L.jpg",
    genre_ids: [28, 12, 18],
    genres: [{ id: 28, name: "Action" }, { id: 12, name: "Adventure" }, { id: 18, name: "Drama" }],
    trailer_key: "4rgYUipGJNo",
    status: "Upcoming",
    budget: 250000000,
    revenue: 460000000,
    director: "Ridley Scott",
    featured: false,
    category: ["upcoming", "trending", "now_playing"],
    cast: [
      { id: 1190668, name: "Paul Mescal", character: "Lucius Verus", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/46/Paul_Mescal_at_the_Toronto_International_Film_Festival_in_2025_2_%28cropped_2%29.jpg/330px-Paul_Mescal_at_the_Toronto_International_Film_Festival_in_2025_2_%28cropped_2%29.jpg" },
      { id: 5292, name: "Denzel Washington", character: "Macrinus", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Denzel_Washington_2018.jpg/330px-Denzel_Washington_2018.jpg" },
      { id: 74213, name: "Pedro Pascal", character: "Marcus Acacius", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6d/Pedro_Pascal_at_the_2025_Cannes_Film_Festival_04.jpg/330px-Pedro_Pascal_at_the_2025_Cannes_Film_Festival_04.jpg" },
    ],
  },
  // 15. The Substance
  {
    id: 933260,
    title: "The Substance",
    original_title: "The Substance",
    tagline: "If you respect the balance, what could go wrong?",
    overview: "A fading celebrity decides to use a black market drug, a cell-replicating substance that temporarily creates a younger, better version of herself, unleashing unexpected bodily consequences.",
    release_date: "2024-09-07",
    vote_average: 8.0,
    vote_count: 1450,
    popularity: 790.2,
    runtime: 141,
    poster_path: "/bVSOgrxasVJF6V71T7v2KfBRSzu.jpg",
    backdrop_path: "/bVSOgrxasVJF6V71T7v2KfBRSzu.jpg",
    genre_ids: [27, 878],
    genres: [{ id: 27, name: "Horror" }, { id: 878, name: "Sci-Fi" }],
    trailer_key: "LNlrGhPdn68",
    status: "Released",
    budget: 17500000,
    revenue: 43000000,
    director: "Coralie Fargeat",
    featured: false,
    category: ["now_playing", "trending"],
    cast: [
      { id: 1234, name: "Demi Moore", character: "Elisabeth Sparkle", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/82/Demi_Moore_at_the_2026_Cannes_Film_Festival_%28cropped%29.jpg/330px-Demi_Moore_at_the_2026_Cannes_Film_Festival_%28cropped%29.jpg" },
      { id: 5678, name: "Margaret Qualley", character: "Sue", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/57/Margaret_Qualley_at_the_2025_Cannes_Film_Festival_01_%28cropped%29%282%29.jpg/330px-Margaret_Qualley_at_the_2025_Cannes_Film_Festival_01_%28cropped%29%282%29.jpg" },
    ],
  },
  // 16. Blade Runner 2049
  {
    id: 335984,
    title: "Blade Runner 2049",
    original_title: "Blade Runner 2049",
    tagline: "The key to the future is finally unearthed.",
    overview: "Thirty years after the events of the first film, a new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what's left of society into chaos.",
    release_date: "2017-10-04",
    vote_average: 8.4,
    vote_count: 13500,
    popularity: 620.2,
    runtime: 164,
    poster_path: "/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    backdrop_path: "/ilRyASDvt7v1S4gX860xWeUq328.jpg",
    genre_ids: [878, 18, 9648],
    genres: [{ id: 878, name: "Sci-Fi" }, { id: 18, name: "Drama" }, { id: 9648, name: "Mystery" }],
    trailer_key: "gCcx85zbxz4",
    status: "Released",
    budget: 150000000,
    revenue: 259239671,
    director: "Denis Villeneuve",
    featured: false,
    category: ["top_rated", "trending"],
    cast: [
      { id: 30614, name: "Ryan Gosling", character: "K", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/62/GoslingBFI081223_%2822_of_30%29_%2853388157347%29_%28cropped%29.jpg/330px-GoslingBFI081223_%2822_of_30%29_%2853388157347%29_%28cropped%29.jpg" },
      { id: 3, name: "Harrison Ford", character: "Rick Deckard", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Harrison_Ford_-_Televerse_2025-03.jpg/330px-Harrison_Ford_-_Televerse_2025-03.jpg" },
    ],
  },
  // 17. The Batman
  {
    id: 414906,
    title: "The Batman",
    original_title: "The Batman",
    tagline: "Unmask the truth.",
    overview: "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
    release_date: "2022-03-01",
    vote_average: 8.3,
    vote_count: 10200,
    popularity: 680.3,
    runtime: 176,
    poster_path: "/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    backdrop_path: "/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
    genre_ids: [80, 9648, 53],
    genres: [{ id: 80, name: "Crime" }, { id: 9648, name: "Mystery" }, { id: 53, name: "Thriller" }],
    trailer_key: "mqqft2x_Aa4",
    status: "Released",
    budget: 200000000,
    revenue: 772245583,
    director: "Matt Reeves",
    featured: false,
    category: ["trending", "top_rated"],
    cast: [
      { id: 11288, name: "Robert Pattinson", character: "Bruce Wayne / Batman", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d6/Robert_Pattinson_Venice_Film_Festival_%28cropped%29.jpg/330px-Robert_Pattinson_Venice_Film_Festival_%28cropped%29.jpg" },
      { id: 505710, name: "Zoë Kravitz", character: "Selina Kyle / Catwoman", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/32/Zoe_Kravitz_2020_dvna_studio.jpg/330px-Zoe_Kravitz_2020_dvna_studio.jpg" },
    ],
  },
  // 18. Everything Everywhere All at Once
  {
    id: 545611,
    title: "Everything Everywhere All at Once",
    original_title: "Everything Everywhere All at Once",
    tagline: "The universe is so much bigger than you realize.",
    overview: "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save what's important to her by connecting with the lives she could have led across parallel realities.",
    release_date: "2022-03-24",
    vote_average: 8.5,
    vote_count: 6100,
    popularity: 640.7,
    runtime: 139,
    poster_path: "/wjQXZTlFM3PVEUmKf1sUajjygqT.jpg",
    backdrop_path: "/c36iKkN4Y8i5Z5VlWp1wE7xQk0E.jpg",
    genre_ids: [28, 12, 878],
    genres: [{ id: 28, name: "Action" }, { id: 12, name: "Adventure" }, { id: 878, name: "Sci-Fi" }],
    trailer_key: "wxN1T1uxQ2g",
    status: "Released",
    budget: 25000000,
    revenue: 141400000,
    director: "Daniel Kwan, Daniel Scheinert",
    featured: false,
    category: ["top_rated", "trending"],
    cast: [
      { id: 1620, name: "Michelle Yeoh", character: "Evelyn Wang", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/68/Michelle_Yeoh-2268.jpg/330px-Michelle_Yeoh-2268.jpg" },
      { id: 22616, name: "Ke Huy Quan", character: "Waymond Wang", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8b/Ke_Huy_Quan_at_the_White_House_%2852902390767%29_%28cropped%29.jpg/330px-Ke_Huy_Quan_at_the_White_House_%2852902390767%29_%28cropped%29.jpg" },
    ],
  },
  // 19. Whiplash
  {
    id: 244786,
    title: "Whiplash",
    original_title: "Whiplash",
    tagline: "The road to greatness can take you to the edge.",
    overview: "Under the direction of a ruthless instructor, a talented young drummer begins to pursue perfection at any cost, testing the very boundaries of his sanity.",
    release_date: "2014-10-10",
    vote_average: 8.7,
    vote_count: 14900,
    popularity: 610.5,
    runtime: 107,
    poster_path: "/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
    backdrop_path: "/6bbZ6XyvgfjhC0lnmH3sZ3vSjS2.jpg",
    genre_ids: [18, 10402],
    genres: [{ id: 18, name: "Drama" }, { id: 10402, name: "Music" }],
    trailer_key: "7d_jQycdQGo",
    status: "Released",
    budget: 3300000,
    revenue: 49000000,
    director: "Damien Chazelle",
    featured: false,
    category: ["top_rated"],
    cast: [
      { id: 2180, name: "Miles Teller", character: "Andrew Neiman", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c8/Miles_Teller_TIFF_2025_%283x4_cropped%29.png/330px-Miles_Teller_TIFF_2025_%283x4_cropped%29.png" },
      { id: 18999, name: "J.K. Simmons", character: "Terence Fletcher", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/JK_Simmons_at_the_2024_Toronto_International_Film_Festival_%28cropped%29.jpg/330px-JK_Simmons_at_the_2024_Toronto_International_Film_Festival_%28cropped%29.jpg" },
    ],
  },
  // 20. Avatar: Fire and Ash
  {
    id: 83533,
    title: "Avatar: Fire and Ash",
    original_title: "Avatar: Fire and Ash",
    tagline: "The journey on Pandora enters uncharted flames.",
    overview: "The third installment of James Cameron's Avatar saga, introducing the Ash People, a volcanic clan of Na'vi who reveal the darker aspects of life on Pandora.",
    release_date: "2025-12-19",
    vote_average: 8.4,
    vote_count: 950,
    popularity: 890.0,
    runtime: 190,
    poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    backdrop_path: "/vL5LR6WdxWPjC02b269q6b12.jpg",
    genre_ids: [878, 12, 28],
    genres: [{ id: 878, name: "Sci-Fi" }, { id: 12, name: "Adventure" }, { id: 28, name: "Action" }],
    trailer_key: "d9MyW72ELq0",
    status: "Upcoming",
    budget: 250000000,
    revenue: 0,
    director: "James Cameron",
    featured: false,
    category: ["upcoming"],
    cast: [
      { id: 65731, name: "Sam Worthington", character: "Jake Sully", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4b/Sam_Worthington_2013.jpg/330px-Sam_Worthington_2013.jpg" },
      { id: 8691, name: "Zoe Saldana", character: "Neytiri", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0d/Zoe_Saldana_by_Gage_Skidmore_2.jpg/330px-Zoe_Saldana_by_Gage_Skidmore_2.jpg" },
    ],
  },
  // 21. Superman (2025)
  {
    id: 1063877,
    title: "Superman",
    original_title: "Superman",
    tagline: "Truth, justice and the American way reimagined.",
    overview: "Superman embarks on a journey to reconcile his Kryptonian heritage with his human upbringing as Clark Kent of Smallville, Kansas.",
    release_date: "2025-07-11",
    vote_average: 8.5,
    vote_count: 800,
    popularity: 870.0,
    runtime: 145,
    poster_path: "/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg",
    backdrop_path: "/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg",
    genre_ids: [28, 878, 12],
    genres: [{ id: 28, name: "Action" }, { id: 878, name: "Sci-Fi" }, { id: 12, name: "Adventure" }],
    trailer_key: "uhUht6vAsMY",
    status: "Upcoming",
    budget: 220000000,
    revenue: 0,
    director: "James Gunn",
    featured: false,
    category: ["upcoming"],
    cast: [
      { id: 123456, name: "David Corenswet", character: "Clark Kent / Superman", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/David_Corenswet_2020.jpg/330px-David_Corenswet_2020.jpg" },
      { id: 234567, name: "Rachel Brosnahan", character: "Lois Lane", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/Rachel_Brosnahan_2019.jpg/330px-Rachel_Brosnahan_2019.jpg" },
    ],
  },
  {
    "id": 550,
    "title": "Fight Club",
    "original_title": "Fight Club",
    "tagline": "Mischief. Mayhem. Soap.",
    "overview": "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground 'fight clubs' forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
    "release_date": "1999-10-15",
    "vote_average": 8.8,
    "vote_count": 28500,
    "popularity": 760.5,
    "runtime": 139,
    "poster_path": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    "backdrop_path": "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
    "genre_ids": [
      18,
      53
    ],
    "genres": [
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 53,
        "name": "Thriller"
      }
    ],
    "trailer_key": "O1DTD_A2534",
    "status": "Released",
    "budget": 63000000,
    "revenue": 101209702,
    "director": "David Fincher",
    "featured": false,
    "category": [
      "top_rated"
    ],
    "cast": [
      {
        "id": 287,
        "name": "Brad Pitt",
        "character": "Tyler Durden",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/90/Brad_Pitt-69858.jpg/330px-Brad_Pitt-69858.jpg"
      },
      {
        "id": 819,
        "name": "Edward Norton",
        "character": "The Narrator",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b1/Ed_Norton_and_Shauna_Robertson_TIFF_2025_%28cropped%29.jpg/330px-Ed_Norton_and_Shauna_Robertson_TIFF_2025_%28cropped%29.jpg"
      },
      {
        "id": 1283,
        "name": "Helena Bonham Carter",
        "character": "Marla Singer",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/MerchantIvoryCurzMayfair201124_%2816_of_28%29_%2854154554145%29_%28cropped%29.jpg/330px-MerchantIvoryCurzMayfair201124_%2816_of_28%29_%2854154554145%29_%28cropped%29.jpg"
      }
    ]
  },

  {
    "id": 603,
    "title": "The Matrix",
    "original_title": "The Matrix",
    "tagline": "Welcome to the Real World.",
    "overview": "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.",
    "release_date": "1999-03-30",
    "vote_average": 8.7,
    "vote_count": 25400,
    "popularity": 730,
    "runtime": 136,
    "poster_path": "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    "backdrop_path": "/l4QHerTSbMI7qgvasqxP36pqjN6.jpg",
    "genre_ids": [
      28,
      878
    ],
    "genres": [
      {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 878,
        "name": "Sci-Fi"
      }
    ],
    "trailer_key": "vKQi3bBA1y8",
    "status": "Released",
    "budget": 63000000,
    "revenue": 467222728,
    "director": "Lana Wachowski, Lilly Wachowski",
    "featured": false,
    "category": [
      "top_rated"
    ],
    "cast": [
      {
        "id": 6384,
        "name": "Keanu Reeves",
        "character": "Thomas A. Anderson / Neo",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b4/Keanu_Reeves_at_TIFF_2025_02_%28Cropped%29.jpg/330px-Keanu_Reeves_at_TIFF_2025_02_%28Cropped%29.jpg"
      },
      {
        "id": 2975,
        "name": "Laurence Fishburne",
        "character": "Morpheus",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c7/Laurence_Fishburne_at_53rd_Saturn_Awards_2026.jpg/330px-Laurence_Fishburne_at_53rd_Saturn_Awards_2026.jpg"
      },
      {
        "id": 530,
        "name": "Carrie-Anne Moss",
        "character": "Trinity",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/Carrie-Anne_Moss_at_2026_Toronto_International_Film_Festival_-_%22YAGA%22_Premiere_14-2.jpg/330px-Carrie-Anne_Moss_at_2026_Toronto_International_Film_Festival_-_%22YAGA%22_Premiere_14-2.jpg"
      }
    ]
  },

  {
    "id": 299534,
    "title": "Avengers: Endgame",
    "original_title": "Avengers: Endgame",
    "tagline": "Part of the journey is the end.",
    "overview": "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    "release_date": "2019-04-24",
    "vote_average": 8.6,
    "vote_count": 26000,
    "popularity": 880.2,
    "runtime": 181,
    "poster_path": "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    "backdrop_path": "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    "genre_ids": [
      12,
      878,
      28
    ],
    "genres": [
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 878,
        "name": "Sci-Fi"
      },
      {
        "id": 28,
        "name": "Action"
      }
    ],
    "trailer_key": "TcMBFSGVi1c",
    "status": "Released",
    "budget": 356000000,
    "revenue": 2799439100,
    "director": "Anthony Russo, Joe Russo",
    "featured": false,
    "category": [
      "top_rated",
      "trending"
    ],
    "cast": [
      {
        "id": 3223,
        "name": "Robert Downey Jr.",
        "character": "Tony Stark / Iron Man",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a9/RobertDowneyJr-byPhilipRomano7_%28cropped%29.jpg/330px-RobertDowneyJr-byPhilipRomano7_%28cropped%29.jpg"
      },
      {
        "id": 16828,
        "name": "Chris Evans",
        "character": "Steve Rogers / Captain America",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d5/Chris_Evans_at_the_2025_Toronto_International_Film_Festival_%28cropped%29.jpg/330px-Chris_Evans_at_the_2025_Toronto_International_Film_Festival_%28cropped%29.jpg"
      },
      {
        "id": 1245,
        "name": "Scarlett Johansson",
        "character": "Natasha Romanoff / Black Widow",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/Scarlett_Johansson-8588.jpg/330px-Scarlett_Johansson-8588.jpg"
      },
      {
        "id": 103,
        "name": "Mark Ruffalo",
        "character": "Bruce Banner / Hulk",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/11/Mark_Ruffalo_%2836201774756%29_%28cropped%29.jpg/330px-Mark_Ruffalo_%2836201774756%29_%28cropped%29.jpg"
      }
    ]
  },

  {
    "id": 769,
    "title": "GoodFellas",
    "original_title": "GoodFellas",
    "tagline": "Three decades of life in the mafia.",
    "overview": "The true story of Henry Hill, a half-Irish, half-Sicilian Brooklyn kid who is adopted by neighborhood gangsters at an early age and climbs the ranks of a Mafia family under the guidance of Jimmy Conway.",
    "release_date": "1990-09-12",
    "vote_average": 8.7,
    "vote_count": 13000,
    "popularity": 640,
    "runtime": 145,
    "poster_path": "/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
    "backdrop_path": "/sw7mordbZxgITU877yTpZCud90M.jpg",
    "genre_ids": [
      18,
      80
    ],
    "genres": [
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 80,
        "name": "Crime"
      }
    ],
    "trailer_key": "2ilzidi_J8Q",
    "status": "Released",
    "budget": 25000000,
    "revenue": 46836394,
    "director": "Martin Scorsese",
    "featured": false,
    "category": [
      "top_rated"
    ],
    "cast": [
      {
        "id": 380,
        "name": "Robert De Niro",
        "character": "James 'Jimmy' Conway",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Robert_de_Niro_Cannes_Film_Festival_%283x4_cropped%29.jpg/330px-Robert_de_Niro_Cannes_Film_Festival_%283x4_cropped%29.jpg"
      },
      {
        "id": 1152,
        "name": "Ray Liotta",
        "character": "Henry Hill",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/Ray_Liotta_Deauville_2014_3.jpg/330px-Ray_Liotta_Deauville_2014_3.jpg"
      },
      {
        "id": 4500,
        "name": "Joe Pesci",
        "character": "Tommy DeVito",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/37/JoePesci-2009.jpg/330px-JoePesci-2009.jpg"
      }
    ]
  },

  {
    "id": 120,
    "title": "The Lord of the Rings: The Fellowship of the Ring",
    "original_title": "The Lord of the Rings: The Fellowship of the Ring",
    "tagline": "One ring to rule them all.",
    "overview": "Young hobbit Frodo Baggins, after inheriting a mysterious ring from his uncle Bilbo, must leave his home behind in order to begin an epic quest to the fires of Mount Doom, the only place where it can be destroyed.",
    "release_date": "2001-12-18",
    "vote_average": 8.9,
    "vote_count": 24800,
    "popularity": 810,
    "runtime": 178,
    "poster_path": "/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
    "backdrop_path": "/2u7zbn8EudG6kLlBzUYqP8RyFU4.jpg",
    "genre_ids": [
      12,
      14,
      28
    ],
    "genres": [
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 14,
        "name": "Fantasy"
      },
      {
        "id": 28,
        "name": "Action"
      }
    ],
    "trailer_key": "V75dMMIW2B4",
    "status": "Released",
    "budget": 93000000,
    "revenue": 897690072,
    "director": "Peter Jackson",
    "featured": false,
    "category": [
      "top_rated"
    ],
    "cast": [
      {
        "id": 109,
        "name": "Elijah Wood",
        "character": "Frodo Baggins",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/95/Elijah_Wood_at_the_2025_Sundance_Film_Festival_%28cropped%292.jpg/330px-Elijah_Wood_at_the_2025_Sundance_Film_Festival_%28cropped%292.jpg"
      },
      {
        "id": 1327,
        "name": "Ian McKellen",
        "character": "Gandalf",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/SDCC13_-_Ian_McKellen.jpg/330px-SDCC13_-_Ian_McKellen.jpg"
      },
      {
        "id": 110,
        "name": "Viggo Mortensen",
        "character": "Aragorn",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/30/Viggo_Mortensen%2C_director_y_actor%2C_en_AWFF_2024_%28cropped%29.jpg/330px-Viggo_Mortensen%2C_director_y_actor%2C_en_AWFF_2024_%28cropped%29.jpg"
      }
    ]
  },

  {
    "id": 13,
    "title": "Forrest Gump",
    "original_title": "Forrest Gump",
    "tagline": "Life is like a box of chocolates. You never know what you're gonna get.",
    "overview": "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do. Yet, despite all the things he has attained, his only true love eludes him.",
    "release_date": "1994-06-23",
    "vote_average": 8.8,
    "vote_count": 27500,
    "popularity": 770,
    "runtime": 142,
    "poster_path": "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    "backdrop_path": "/qdIMHd4sEfJSckfVJfKQvisL02a.jpg",
    "genre_ids": [
      35,
      18,
      10749
    ],
    "genres": [
      {
        "id": 35,
        "name": "Comedy"
      },
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 10749,
        "name": "Romance"
      }
    ],
    "trailer_key": "bLvqoHBptjg",
    "status": "Released",
    "budget": 55000000,
    "revenue": 677387716,
    "director": "Robert Zemeckis",
    "featured": false,
    "category": [
      "top_rated"
    ],
    "cast": [
      {
        "id": 31,
        "name": "Tom Hanks",
        "character": "Forrest Gump",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/39/TomHanksPrincEdw031223_%2811_of_41%29_%28cropped%29.jpg/330px-TomHanksPrincEdw031223_%2811_of_41%29_%28cropped%29.jpg"
      },
      {
        "id": 32,
        "name": "Robin Wright",
        "character": "Jenny Curran",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cd/Robin_Wright_Cannes_2017.jpg/330px-Robin_Wright_Cannes_2017.jpg"
      },
      {
        "id": 33,
        "name": "Gary Sinise",
        "character": "Lt. Dan Taylor",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2d/Gary_Sinise_2026_%28cropped%29.jpg/330px-Gary_Sinise_2026_%28cropped%29.jpg"
      }
    ]
  },

  {
    "id": 807,
    "title": "Se7en",
    "original_title": "Se7en",
    "tagline": "Seven deadly sins. Seven ways to die.",
    "overview": "Two homicide detectives are on a desperate hunt for a serial killer whose crimes are based on the 'seven deadly sins'. The seasoned and cultured William Somerset researches the seven deadly sins in an effort to understand the killer's modus operandi.",
    "release_date": "1995-09-22",
    "vote_average": 8.6,
    "vote_count": 20900,
    "popularity": 690,
    "runtime": 127,
    "poster_path": "/6yoghtyTpznpBik8EngEmJskVUO.jpg",
    "backdrop_path": "/se5Hxz7PArQZOG3Nx2bpfOhLhtV.jpg",
    "genre_ids": [
      80,
      9648,
      53
    ],
    "genres": [
      {
        "id": 80,
        "name": "Crime"
      },
      {
        "id": 9648,
        "name": "Mystery"
      },
      {
        "id": 53,
        "name": "Thriller"
      }
    ],
    "trailer_key": "znmZoVkCjpI",
    "status": "Released",
    "budget": 33000000,
    "revenue": 327311859,
    "director": "David Fincher",
    "featured": false,
    "category": [
      "top_rated"
    ],
    "cast": [
      {
        "id": 287,
        "name": "Brad Pitt",
        "character": "Detective David Mills",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/90/Brad_Pitt-69858.jpg/330px-Brad_Pitt-69858.jpg"
      },
      {
        "id": 192,
        "name": "Morgan Freeman",
        "character": "Detective William Somerset",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/42/Morgan_Freeman_at_The_Pentagon_on_2_August_2023_-_230802-D-PM193-3363_%28cropped%29.jpg/330px-Morgan_Freeman_at_The_Pentagon_on_2_August_2023_-_230802-D-PM193-3363_%28cropped%29.jpg"
      },
      {
        "id": 1205,
        "name": "Gwyneth Paltrow",
        "character": "Tracy Mills",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a5/AnneHathaway-byPhilipRomano-Crop.jpg/330px-AnneHathaway-byPhilipRomano-Crop.jpg"
      }
    ]
  },

  {
    "id": 313369,
    "title": "La La Land",
    "original_title": "La La Land",
    "tagline": "Here's to the fools who dream.",
    "overview": "Mia, an aspiring actress, serves lattes to movie stars in between auditions and Sebastian, a jazz musician, scrapes by playing cocktail party gigs in dingy bars, but as success mounts they are faced with decisions that begin to fray the fragile fabric of their love affair.",
    "release_date": "2016-11-29",
    "vote_average": 8.4,
    "vote_count": 17200,
    "popularity": 680,
    "runtime": 128,
    "poster_path": "/2LqaLgk4Z226KkgPJuiOQ58wvrm.jpg",
    "backdrop_path": "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    "genre_ids": [
      35,
      18,
      10402,
      10749
    ],
    "genres": [
      {
        "id": 35,
        "name": "Comedy"
      },
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 10402,
        "name": "Music"
      },
      {
        "id": 10749,
        "name": "Romance"
      }
    ],
    "trailer_key": "0pdqf4P9MB8",
    "status": "Released",
    "budget": 30000000,
    "revenue": 447407695,
    "director": "Damien Chazelle",
    "featured": false,
    "category": [
      "top_rated"
    ],
    "cast": [
      {
        "id": 30614,
        "name": "Ryan Gosling",
        "character": "Sebastian Wilder",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/62/GoslingBFI081223_%2822_of_30%29_%2853388157347%29_%28cropped%29.jpg/330px-GoslingBFI081223_%2822_of_30%29_%2853388157347%29_%28cropped%29.jpg"
      },
      {
        "id": 54693,
        "name": "Emma Stone",
        "character": "Mia Dolan",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/Emma_Stone_at_the_2025_Venice_Film_Festival-6313_%28cropped%29.jpg/330px-Emma_Stone_at_the_2025_Venice_Film_Festival-6313_%28cropped%29.jpg"
      },
      {
        "id": 12835,
        "name": "John Legend",
        "character": "Keith",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/David_Jonsson_by_Gage_Skidmore.jpg/330px-David_Jonsson_by_Gage_Skidmore.jpg"
      }
    ]
  },

  {
    "id": 346698,
    "title": "Barbie",
    "original_title": "Barbie",
    "tagline": "She's everything. He's just Ken.",
    "overview": "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.",
    "release_date": "2023-07-19",
    "vote_average": 8.1,
    "vote_count": 14500,
    "popularity": 830,
    "runtime": 114,
    "poster_path": "/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    "backdrop_path": "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    "genre_ids": [
      35,
      12
    ],
    "genres": [
      {
        "id": 35,
        "name": "Comedy"
      },
      {
        "id": 12,
        "name": "Adventure"
      }
    ],
    "trailer_key": "pBk4NYhWNMM",
    "status": "Released",
    "budget": 145000000,
    "revenue": 1445638421,
    "director": "Greta Gerwig",
    "featured": false,
    "category": [
      "trending"
    ],
    "cast": [
      {
        "id": 234352,
        "name": "Margot Robbie",
        "character": "Barbie",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/90/Margot_Robbie_Wuthering_Heights_premiere_%28cropped%29.jpg/330px-Margot_Robbie_Wuthering_Heights_premiere_%28cropped%29.jpg"
      },
      {
        "id": 30614,
        "name": "Ryan Gosling",
        "character": "Ken",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/62/GoslingBFI081223_%2822_of_30%29_%2853388157347%29_%28cropped%29.jpg/330px-GoslingBFI081223_%2822_of_30%29_%2853388157347%29_%28cropped%29.jpg"
      },
      {
        "id": 1136406,
        "name": "America Ferrera",
        "character": "Gloria",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7b/Stephanie_Hsu_2022.jpg/330px-Stephanie_Hsu_2022.jpg"
      }
    ]
  },

  {
    "id": 361743,
    "title": "Top Gun: Maverick",
    "original_title": "Top Gun: Maverick",
    "tagline": "Feel the need. The need for speed.",
    "overview": "After more than thirty years of service as one of the Navy's top aviators, Pete 'Maverick' Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him.",
    "release_date": "2022-05-24",
    "vote_average": 8.6,
    "vote_count": 19800,
    "popularity": 790,
    "runtime": 131,
    "poster_path": "/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    "backdrop_path": "/odJ4hx6g6vBt4lBWKFD1tI8WS4x.jpg",
    "genre_ids": [
      28,
      18
    ],
    "genres": [
      {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 18,
        "name": "Drama"
      }
    ],
    "trailer_key": "giXco2jaZ_4",
    "status": "Released",
    "budget": 170000000,
    "revenue": 1495696292,
    "director": "Joseph Kosinski",
    "featured": false,
    "category": [
      "top_rated",
      "trending"
    ],
    "cast": [
      {
        "id": 500,
        "name": "Tom Cruise",
        "character": "Capt. Pete 'Maverick' Mitchell",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/Tom_Cruise_at_53rd_Saturn_Awards_2026-01.jpg/330px-Tom_Cruise_at_53rd_Saturn_Awards_2026-01.jpg"
      },
      {
        "id": 74443,
        "name": "Miles Teller",
        "character": "Lt. Bradley 'Rooster' Bradshaw",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c8/Miles_Teller_TIFF_2025_%283x4_cropped%29.png/330px-Miles_Teller_TIFF_2025_%283x4_cropped%29.png"
      },
      {
        "id": 2038,
        "name": "Jennifer Connelly",
        "character": "Penny Benjamin",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6d/Jennifer_Connelly_2019_2.png/330px-Jennifer_Connelly_2019_2.png"
      }
    ]
  },

  {
    "id": 475557,
    "title": "Joker",
    "original_title": "Joker",
    "tagline": "Put on a happy face.",
    "overview": "During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure.",
    "release_date": "2019-10-02",
    "vote_average": 8.5,
    "vote_count": 24700,
    "popularity": 810,
    "runtime": 122,
    "poster_path": "/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    "backdrop_path": "/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg",
    "genre_ids": [
      80,
      53,
      18
    ],
    "genres": [
      {
        "id": 80,
        "name": "Crime"
      },
      {
        "id": 53,
        "name": "Thriller"
      },
      {
        "id": 18,
        "name": "Drama"
      }
    ],
    "trailer_key": "zAGVQLHvwOY",
    "status": "Released",
    "budget": 55000000,
    "revenue": 1074458282,
    "director": "Todd Phillips",
    "featured": false,
    "category": [
      "top_rated"
    ],
    "cast": [
      {
        "id": 73421,
        "name": "Joaquin Phoenix",
        "character": "Arthur Fleck / Joker",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dc/Joaquin_Phoenix-64908_%28cropped%29.jpg/330px-Joaquin_Phoenix-64908_%28cropped%29.jpg"
      },
      {
        "id": 380,
        "name": "Robert De Niro",
        "character": "Murray Franklin",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Robert_de_Niro_Cannes_Film_Festival_%283x4_cropped%29.jpg/330px-Robert_de_Niro_Cannes_Film_Festival_%283x4_cropped%29.jpg"
      },
      {
        "id": 1545693,
        "name": "Zazie Beetz",
        "character": "Sophie Dumond",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/Zazie_Beetz_by_Gage_Skidmore.jpg/330px-Zazie_Beetz_by_Gage_Skidmore.jpg"
      }
    ]
  },

  {
    "id": 324857,
    "title": "Spider-Man: Into the Spider-Verse",
    "original_title": "Spider-Man: Into the Spider-Verse",
    "tagline": "More than one wears the mask.",
    "overview": "Miles Morales is juggling his life between being a high school student and being a spider-man. When Wilson 'Kingpin' Fisk uses a super collider, others from across the multiverse are brought to this dimension.",
    "release_date": "2018-12-06",
    "vote_average": 8.7,
    "vote_count": 15200,
    "popularity": 760,
    "runtime": 117,
    "poster_path": "/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
    "backdrop_path": "/8mnXR9rey5uQ08rZAvzojKWbDQS.jpg",
    "genre_ids": [
      16,
      28,
      12,
      878
    ],
    "genres": [
      {
        "id": 16,
        "name": "Animation"
      },
      {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 878,
        "name": "Sci-Fi"
      }
    ],
    "trailer_key": "tg52up16eq0",
    "status": "Released",
    "budget": 90000000,
    "revenue": 375540831,
    "director": "Bob Persichetti, Peter Ramsey, Rodney Rothman",
    "featured": false,
    "category": [
      "top_rated"
    ],
    "cast": [
      {
        "id": 124314,
        "name": "Shameik Moore",
        "character": "Miles Morales (voice)",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/Shameik_Moore_Photo_Op_GalaxyCon_Raleigh_2023.jpg/330px-Shameik_Moore_Photo_Op_GalaxyCon_Raleigh_2023.jpg"
      },
      {
        "id": 54693,
        "name": "Hailee Steinfeld",
        "character": "Gwen Stacy (voice)",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/Hailee_Steinfeld_by_Gage_Skidmore.jpg/330px-Hailee_Steinfeld_by_Gage_Skidmore.jpg"
      },
      {
        "id": 73421,
        "name": "Mahershala Ali",
        "character": "Aaron Davis / Prowler (voice)",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d0/Javier_Bardem_-_Bunker_-_TIFF_2026-12.jpg/330px-Javier_Bardem_-_Bunker_-_TIFF_2026-12.jpg"
      }
    ]
  },

  {
    "id": 274,
    "title": "The Silence of the Lambs",
    "original_title": "The Silence of the Lambs",
    "tagline": "To enter the mind of a killer she must challenge the mind of a madman.",
    "overview": "Clarice Starling is a top student at the FBI's training academy. Jack Crawford wants Clarice to interview Dr. Hannibal Lecter, a brilliant psychiatrist who is also a violent psychopath, serving life behind bars for various acts of murder and cannibalism.",
    "release_date": "1991-02-14",
    "vote_average": 8.6,
    "vote_count": 16100,
    "popularity": 720,
    "runtime": 118,
    "poster_path": "/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg",
    "backdrop_path": "/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg",
    "genre_ids": [
      80,
      18,
      53
    ],
    "genres": [
      {
        "id": 80,
        "name": "Crime"
      },
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 53,
        "name": "Thriller"
      }
    ],
    "trailer_key": "W6Mm8Sbe__o",
    "status": "Released",
    "budget": 19000000,
    "revenue": 272742922,
    "director": "Jonathan Demme",
    "featured": false,
    "category": [
      "top_rated"
    ],
    "cast": [
      {
        "id": 1038,
        "name": "Jodie Foster",
        "character": "Clarice Starling",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Jodie_Foster_Taxi_Driver_Tribeca_Festival_2026-20_%28cropped%29.jpg/330px-Jodie_Foster_Taxi_Driver_Tribeca_Festival_2026-20_%28cropped%29.jpg"
      },
      {
        "id": 4173,
        "name": "Anthony Hopkins",
        "character": "Dr. Hannibal Lecter",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/63/Anthony_Hopkins_Red_Sea_Festival_2025_Portrait_%28cropped%29.jpg/330px-Anthony_Hopkins_Red_Sea_Festival_2025_Portrait_%28cropped%29.jpg"
      },
      {
        "id": 287,
        "name": "Scott Glenn",
        "character": "Jack Crawford",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2d/Gary_Sinise_2026_%28cropped%29.jpg/330px-Gary_Sinise_2026_%28cropped%29.jpg"
      }
    ]
  },

  {
    "id": 945961,
    "title": "Alien: Romulus",
    "original_title": "Alien: Romulus",
    "tagline": "In space, no one can hear you scream.",
    "overview": "While scavenging the deep ends of a derelict space station, a group of young space colonizers come face to face with the most terrifying life form in the universe.",
    "release_date": "2024-08-14",
    "vote_average": 8.2,
    "vote_count": 5100,
    "popularity": 910,
    "runtime": 119,
    "poster_path": "/9SSEUrSqhljBMzRe4aBTh17rUaC.jpg",
    "backdrop_path": "/9SSEUrSqhljBMzRe4aBTh17rUaC.jpg",
    "genre_ids": [
      27,
      878
    ],
    "genres": [
      {
        "id": 27,
        "name": "Horror"
      },
      {
        "id": 878,
        "name": "Sci-Fi"
      }
    ],
    "trailer_key": "x0XDEhP4MQs",
    "status": "Released",
    "budget": 80000000,
    "revenue": 350860000,
    "director": "Fede Álvarez",
    "featured": false,
    "category": [
      "trending",
      "now_playing"
    ],
    "cast": [
      {
        "id": 2002341,
        "name": "Cailee Spaeny",
        "character": "Rain Carradine",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bc/Cailee_Spaeny-08726-2_%28cropped%29.jpg/330px-Cailee_Spaeny-08726-2_%28cropped%29.jpg"
      },
      {
        "id": 2364234,
        "name": "David Jonsson",
        "character": "Andy",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/David_Jonsson_by_Gage_Skidmore.jpg/330px-David_Jonsson_by_Gage_Skidmore.jpg"
      },
      {
        "id": 2341234,
        "name": "Archie Renaux",
        "character": "Tyler",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/61/Austin_Butler_2023.jpg/330px-Austin_Butler_2023.jpg"
      }
    ]
  },

  {
    "id": 402431,
    "title": "Wicked",
    "original_title": "Wicked",
    "tagline": "Everyone deserves the chance to fly.",
    "overview": "Elphaba, a misunderstood young woman because of her green skin who has yet to discover her true power, and Glinda, a popular girl gilded by privilege who has yet to discover her true heart, as they embark on a journey that will determine their destinies as Glinda the Good and the Wicked Witch of the West.",
    "release_date": "2024-11-20",
    "vote_average": 8.3,
    "vote_count": 4200,
    "popularity": 870,
    "runtime": 160,
    "poster_path": "/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg",
    "backdrop_path": "/uKB22E5ENNC99EtEj7gOCz87XfJ.jpg",
    "genre_ids": [
      18,
      14,
      10402
    ],
    "genres": [
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 14,
        "name": "Fantasy"
      },
      {
        "id": 10402,
        "name": "Music"
      }
    ],
    "trailer_key": "6COmYeLsz4c",
    "status": "Released",
    "budget": 145000000,
    "revenue": 720000000,
    "director": "Jon M. Chu",
    "featured": false,
    "category": [
      "now_playing",
      "trending"
    ],
    "cast": [
      {
        "id": 1544458,
        "name": "Cynthia Erivo",
        "character": "Elphaba Thropp",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9b/Cynthia_Erivo_-_Wicked-FYC-2_%28cropped%29.jpg/330px-Cynthia_Erivo_-_Wicked-FYC-2_%28cropped%29.jpg"
      },
      {
        "id": 1172422,
        "name": "Ariana Grande",
        "character": "Glinda Upland",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/Ariana_Grande_promoting_Wicked_%282024%29.jpg/330px-Ariana_Grande_promoting_Wicked_%282024%29.jpg"
      },
      {
        "id": 124314,
        "name": "Jonathan Bailey",
        "character": "Fiyero Tigelaar",
        "profile_path": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/David_Corenswet_2020.jpg/330px-David_Corenswet_2020.jpg"
      }
    ]
  },
  {
    id: 98,
    title: "Gladiator",
    original_title: "Gladiator",
    tagline: "What we do in life echoes in eternity.",
    overview: "In the year 180, the death of emperor Marcus Aurelius throws the Roman Empire into turmoil. Maximum, one of the Roman army's most capable and trusted generals and his key advisor, is betrayed and condemned to the arena as a gladiator.",
    release_date: "2000-05-01",
    vote_average: 8.5,
    vote_count: 18500,
    popularity: 740,
    runtime: 155,
    poster_path: "/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    backdrop_path: "/b82nBgj9fS2f9t9M9Xv0Lg9iK4d.jpg",
    genre_ids: [28, 18, 12],
    genres: [{ id: 28, name: "Action" }, { id: 18, name: "Drama" }, { id: 12, name: "Adventure" }],
    trailer_key: "owK1qxDselE",
    status: "Released",
    budget: 103000000,
    revenue: 460500000,
    director: "Ridley Scott",
    featured: false,
    category: ["top_rated", "trending"],
    cast: [
      { id: 934, name: "Russell Crowe", character: "Maximus Decimus Meridius", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c2/Russell_Crowe_at_the_2024_Toronto_International_Film_Festival_%28cropped%29.jpg/330px-Russell_Crowe_at_the_2024_Toronto_International_Film_Festival_%28cropped%29.jpg" },
      { id: 73421, name: "Joaquin Phoenix", character: "Commodus", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/26/Joaquin_Phoenix_in_2018.jpg/330px-Joaquin_Phoenix_in_2018.jpg" },
      { id: 73422, name: "Connie Nielsen", character: "Lucilla", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8e/Connie_Nielsen_2018.jpg/330px-Connie_Nielsen_2018.jpg" }
    ]
  },
  {
    id: 1422,
    title: "The Departed",
    original_title: "The Departed",
    tagline: "Lies. Betrayal. Sacrifice. How far will you take it?",
    overview: "To take down South Boston's Irish Mafia, the police send in one of their own to infiltrate the syndicate, not realizing the syndicate has also placed its own rat within the police department.",
    release_date: "2006-10-05",
    vote_average: 8.2,
    vote_count: 14500,
    popularity: 690,
    runtime: 151,
    poster_path: "/nT97ifVT2J1yMQmeq20Qblg61T.jpg",
    backdrop_path: "/63k7Ny3PsQvS5cQ310e20H3TqV5.jpg",
    genre_ids: [18, 80, 53],
    genres: [{ id: 18, name: "Drama" }, { id: 80, name: "Crime" }, { id: 53, name: "Thriller" }],
    trailer_key: "iojhqm0JTW4",
    status: "Released",
    budget: 90000000,
    revenue: 291465033,
    director: "Martin Scorsese",
    featured: false,
    category: ["top_rated"],
    cast: [
      { id: 6193, name: "Leonardo DiCaprio", character: "Billy Costigan", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/Leonardo_DiCaprio_2014.jpg/330px-Leonardo_DiCaprio_2014.jpg" },
      { id: 1892, name: "Matt Damon", character: "Colin Sullivan", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/82/Matt_Damon_TIFF_2015.jpg/330px-Matt_Damon_TIFF_2015.jpg" },
      { id: 514, name: "Jack Nicholson", character: "Frank Costello", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/30/Jack_Nicholson_2001.jpg/330px-Jack_Nicholson_2001.jpg" }
    ]
  },
  {
    id: 1124,
    title: "The Prestige",
    original_title: "The Prestige",
    tagline: "Are you watching closely?",
    overview: "A mysterious story of two magicians whose intense desire to uncover the other's secrets drives them to deadly deception, obsession, and sacrifice in Victorian-era London.",
    release_date: "2006-10-19",
    vote_average: 8.2,
    vote_count: 15800,
    popularity: 680,
    runtime: 130,
    poster_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    backdrop_path: "/yL27Uf2Ff9B523b12389g000000.jpg",
    genre_ids: [18, 9648, 878],
    genres: [{ id: 18, name: "Drama" }, { id: 9648, name: "Mystery" }, { id: 878, name: "Sci-Fi" }],
    trailer_key: "o4gHCmTQDVI",
    status: "Released",
    budget: 40000000,
    revenue: 109676311,
    director: "Christopher Nolan",
    featured: false,
    category: ["top_rated"],
    cast: [
      { id: 3894, name: "Christian Bale", character: "Alfred Borden", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0b/Christian_Bale-7837.jpg/330px-Christian_Bale-7837.jpg" },
      { id: 6968, name: "Hugh Jackman", character: "Robert Angier", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Hugh_Jackman_2019.jpg/330px-Hugh_Jackman_2019.jpg" },
      { id: 1245, name: "Scarlett Johansson", character: "Olivia Wenscombe", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/Scarlett_Johansson_by_Gage_Skidmore_2_%28cropped%29.jpg/330px-Scarlett_Johansson_by_Gage_Skidmore_2_%28cropped%29.jpg" }
    ]
  },
  {
    id: 569094,
    title: "Spider-Man: Across the Spider-Verse",
    original_title: "Spider-Man: Across the Spider-Verse",
    tagline: "It's how you wear the mask that matters.",
    overview: "After reuniting with Gwen Stacy, Brooklyn's full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the Spider Society, a team of Spider-Heroes charged with protecting the Multiverse's very existence.",
    release_date: "2023-05-31",
    vote_average: 8.4,
    vote_count: 6700,
    popularity: 890,
    runtime: 140,
    poster_path: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    backdrop_path: "/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
    genre_ids: [16, 28, 12, 878],
    genres: [{ id: 16, name: "Animation" }, { id: 28, name: "Action" }, { id: 12, name: "Adventure" }, { id: 878, name: "Sci-Fi" }],
    trailer_key: "cqGjhVJWtEg",
    status: "Released",
    budget: 100000000,
    revenue: 690516673,
    director: "Joaquim Dos Santos",
    featured: false,
    category: ["trending", "top_rated"],
    cast: [
      { id: 1650302, name: "Shameik Moore", character: "Miles Morales (voice)", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9f/Shameik_Moore_by_Gage_Skidmore.jpg/330px-Shameik_Moore_by_Gage_Skidmore.jpg" },
      { id: 54693, name: "Hailee Steinfeld", character: "Gwen Stacy (voice)", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/Hailee_Steinfeld_by_Gage_Skidmore_2.jpg/330px-Hailee_Steinfeld_by_Gage_Skidmore_2.jpg" },
      { id: 25072, name: "Oscar Isaac", character: "Miguel O'Hara (voice)", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/30/Oscar_Isaac_by_Gage_Skidmore_2_%28cropped%29.jpg/330px-Oscar_Isaac_by_Gage_Skidmore_2_%28cropped%29.jpg" }
    ]
  },
  {
    id: 106646,
    title: "The Wolf of Wall Street",
    original_title: "The Wolf of Wall Street",
    tagline: "EARN. SPEND. PARTY.",
    overview: "A New York stockbroker refuses to cooperate in a large securities fraud case involving corruption on Wall Street, corporate banking world and mob infiltration. Based on Jordan Belfort's autobiography.",
    release_date: "2013-12-25",
    vote_average: 8.0,
    vote_count: 23400,
    popularity: 780,
    runtime: 180,
    poster_path: "/pWHf4khOloNVfCxscsXFj3jj6gP.jpg",
    backdrop_path: "/cWUOv3H7YVwvPp3L4M9i7a4a98.jpg",
    genre_ids: [35, 80, 18],
    genres: [{ id: 35, name: "Comedy" }, { id: 80, name: "Crime" }, { id: 18, name: "Drama" }],
    trailer_key: "iszwuX1AK6A",
    status: "Released",
    budget: 100000000,
    revenue: 392000000,
    director: "Martin Scorsese",
    featured: false,
    category: ["trending"],
    cast: [
      { id: 6193, name: "Leonardo DiCaprio", character: "Jordan Belfort", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/Leonardo_DiCaprio_2014.jpg/330px-Leonardo_DiCaprio_2014.jpg" },
      { id: 21007, name: "Jonah Hill", character: "Donnie Azoff", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Jonah_Hill_at_the_Berlinale_2019.jpg/330px-Jonah_Hill_at_the_Berlinale_2019.jpg" },
      { id: 234352, name: "Margot Robbie", character: "Naomi Lapaglia", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0b/Margot_Robbie_at_the_2023_Golden_Globes_2.jpg/330px-Margot_Robbie_at_the_2023_Golden_Globes_2.jpg" }
    ]
  },
  {
    id: 76341,
    title: "Mad Max: Fury Road",
    original_title: "Mad Max: Fury Road",
    tagline: "What a Lovely Day.",
    overview: "An apocalyptic story set in the furthest reaches of our planet, in a stark desert landscape where humanity is broken, and most everyone is crazed fighting for the necessities of life. Within this world exist two rebels on the run.",
    release_date: "2015-05-13",
    vote_average: 7.6,
    vote_count: 22100,
    popularity: 650,
    runtime: 120,
    poster_path: "/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
    backdrop_path: "/nlCHUWjY9XWbuEUQauCBgnY8ymF.jpg",
    genre_ids: [28, 12, 878],
    genres: [{ id: 28, name: "Action" }, { id: 12, name: "Adventure" }, { id: 878, name: "Sci-Fi" }],
    trailer_key: "hEJnMQG930g",
    status: "Released",
    budget: 150000000,
    revenue: 378858340,
    director: "George Miller",
    featured: false,
    category: ["trending"],
    cast: [
      { id: 2524, name: "Tom Hardy", character: "Max Rockatansky", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/Tom_Hardy_by_Gage_Skidmore.jpg/330px-Tom_Hardy_by_Gage_Skidmore.jpg" },
      { id: 6885, name: "Charlize Theron", character: "Imperator Furiosa", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/Charlize-theron-IMG_6045.jpg/330px-Charlize-theron-IMG_6045.jpg" },
      { id: 3292, name: "Nicholas Hoult", character: "Nux", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/ba/Nicholas_Hoult_2019_by_Glenn_Francis_%28cropped%29.jpg/330px-Nicholas_Hoult_2019_by_Glenn_Francis_%28cropped%29.jpg" }
    ]
  },
  {
    id: 244786,
    title: "Whiplash",
    original_title: "Whiplash",
    tagline: "The road to greatness can take you to the edge.",
    overview: "Under the direction of a ruthless instructor, a talented young drummer begins to pursue perfection at any cost, pushing his physical and emotional limits beyond what he thought possible.",
    release_date: "2014-10-10",
    vote_average: 8.4,
    vote_count: 14800,
    popularity: 620,
    runtime: 107,
    poster_path: "/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
    backdrop_path: "/vNXgr094T3mZ4e8j3y93e0bXb8j.jpg",
    genre_ids: [18, 10402],
    genres: [{ id: 18, name: "Drama" }, { id: 10402, name: "Music" }],
    trailer_key: "7d_jQycdQGo",
    status: "Released",
    budget: 3300000,
    revenue: 48982041,
    director: "Damien Chazelle",
    featured: false,
    category: ["top_rated"],
    cast: [
      { id: 70417, name: "Miles Teller", character: "Andrew Neiman", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8f/Miles_Teller_2014.jpg/330px-Miles_Teller_2014.jpg" },
      { id: 18973, name: "J.K. Simmons", character: "Terence Fletcher", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f6/J.K._Simmons_2016.jpg/330px-J.K._Simmons_2016.jpg" },
      { id: 8210, name: "Paul Reiser", character: "Jim Neiman", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/Paul_Reiser_2012.jpg/330px-Paul_Reiser_2012.jpg" }
    ]
  },
  {
    id: 496243,
    title: "Parasite",
    original_title: "기생충",
    tagline: "Act like you own the place.",
    overview: "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
    release_date: "2019-05-30",
    vote_average: 8.5,
    vote_count: 17900,
    popularity: 750,
    runtime: 132,
    poster_path: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    backdrop_path: "/hiKmpraMtk9Oijw1Q11zF0A6ZgN.jpg",
    genre_ids: [35, 53, 18],
    genres: [{ id: 35, name: "Comedy" }, { id: 53, name: "Thriller" }, { id: 18, name: "Drama" }],
    trailer_key: "5xH0R_uxnM0",
    status: "Released",
    budget: 11400000,
    revenue: 263100000,
    director: "Bong Joon-ho",
    featured: false,
    category: ["top_rated", "trending"],
    cast: [
      { id: 20738, name: "Song Kang-ho", character: "Kim Ki-taek", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b2/Song_Kang-ho_in_2019.jpg/330px-Song_Kang-ho_in_2019.jpg" },
      { id: 1109968, name: "Lee Sun-kyun", character: "Park Dong-ik", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8c/Lee_Sun-kyun_in_2019.jpg/330px-Lee_Sun-kyun_in_2019.jpg" },
      { id: 1253457, name: "Cho Yeo-jeong", character: "Park Yeon-gyo", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3f/Cho_Yeo-jeong_at_the_Blue_Dragon_Film_Awards_2019.jpg/330px-Cho_Yeo-jeong_at_the_Blue_Dragon_Film_Awards_2019.jpg" }
    ]
  },
  {
    id: 329,
    title: "Jurassic Park",
    original_title: "Jurassic Park",
    tagline: "An adventure 65 million years in the making.",
    overview: "A wealthy entrepreneur secretly creates a theme park featuring living dinosaurs drawn from prehistoric DNA. Before opening to the public, he invites a select group to visit, but things take a terrifying turn when the security systems fail.",
    release_date: "1993-06-11",
    vote_average: 8.0,
    vote_count: 16100,
    popularity: 710,
    runtime: 127,
    poster_path: "/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg",
    backdrop_path: "/9BBTo63ANSmAgCva2v6QBawAJSu.jpg",
    genre_ids: [12, 878],
    genres: [{ id: 12, name: "Adventure" }, { id: 878, name: "Sci-Fi" }],
    trailer_key: "lc0UehYemQA",
    status: "Released",
    budget: 63000000,
    revenue: 1042000000,
    director: "Steven Spielberg",
    featured: false,
    category: ["top_rated"],
    cast: [
      { id: 139, name: "Sam Neill", character: "Dr. Alan Grant", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/91/Sam_Neill_2016.jpg/330px-Sam_Neill_2016.jpg" },
      { id: 47, name: "Laura Dern", character: "Dr. Ellie Sattler", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b0/Laura_Dern_at_the_2020_SAG_Awards.jpg/330px-Laura_Dern_at_the_2020_SAG_Awards.jpg" },
      { id: 4783, name: "Jeff Goldblum", character: "Dr. Ian Malcolm", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1e/Jeff_Goldblum_by_Gage_Skidmore_2.jpg/330px-Jeff_Goldblum_by_Gage_Skidmore_2.jpg" }
    ]
  },
  {
    id: 769,
    title: "GoodFellas",
    original_title: "GoodFellas",
    tagline: "Three Decades of Life in the Mafia.",
    overview: "The true story of Henry Hill, a half-Irish, half-Sicilian Brooklyn kid who is adopted by neighbourhood gangsters at an early age and climbs the ranks of a Mafia family.",
    release_date: "1990-09-12",
    vote_average: 8.5,
    vote_count: 12900,
    popularity: 720,
    runtime: 145,
    poster_path: "/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
    backdrop_path: "/sw7mordbZxgITU877yTpZCud90M.jpg",
    genre_ids: [18, 80],
    genres: [{ id: 18, name: "Drama" }, { id: 80, name: "Crime" }],
    trailer_key: "2ilzidi_J8Q",
    status: "Released",
    budget: 25000000,
    revenue: 46836394,
    director: "Martin Scorsese",
    featured: false,
    category: ["top_rated"],
    cast: [
      { id: 380, name: "Robert De Niro", character: "James Conway", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/58/Robert_De_Niro_Cannes_2016.jpg/330px-Robert_De_Niro_Cannes_2016.jpg" },
      { id: 1037, name: "Ray Liotta", character: "Henry Hill", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/54/Ray_Liotta_2014.jpg/330px-Ray_Liotta_2014.jpg" },
      { id: 4500, name: "Joe Pesci", character: "Tommy DeVito", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/87/Joe_Pesci_1996.jpg/330px-Joe_Pesci_1996.jpg" }
    ]
  },
  {
    id: 348,
    title: "Alien",
    original_title: "Alien",
    tagline: "In space no one can hear you scream.",
    overview: "During its return to the earth, commercial spaceship Nostromo intercepts a distress signal from a distant planet. When three crew members explore the source, they encounter a terrifying creature that begins hunting them.",
    release_date: "1979-05-25",
    vote_average: 8.2,
    vote_count: 14200,
    popularity: 690,
    runtime: 117,
    poster_path: "/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg",
    backdrop_path: "/AmR3JG1DYz5umgKwFi7OIBfIjM.jpg",
    genre_ids: [27, 878],
    genres: [{ id: 27, name: "Horror" }, { id: 878, name: "Sci-Fi" }],
    trailer_key: "LjLamj-b0I8",
    status: "Released",
    budget: 11000000,
    revenue: 104931801,
    director: "Ridley Scott",
    featured: false,
    category: ["top_rated"],
    cast: [
      { id: 10205, name: "Sigourney Weaver", character: "Ellen Ripley", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/53/Sigourney_Weaver_by_Gage_Skidmore_2.jpg/330px-Sigourney_Weaver_by_Gage_Skidmore_2.jpg" },
      { id: 7064, name: "Tom Skerritt", character: "Dallas", profile_path: null },
      { id: 5049, name: "John Hurt", character: "Kane", profile_path: null }
    ]
  },
  {
    id: 8587,
    title: "The Lion King",
    original_title: "The Lion King",
    tagline: "Life's greatest adventure is finding your place in the Circle of Life.",
    overview: "A young lion prince is cast out of his pride by his cruel uncle, who claims he killed his father. While the uncle rules with an iron paw, the prince grows up beyond the Savannah, living by a philosophy: No worries for the rest of your days. But when his past comes to haunt him, the young prince must decide his destiny.",
    release_date: "1994-06-24",
    vote_average: 8.3,
    vote_count: 17800,
    popularity: 730,
    runtime: 89,
    poster_path: "/1TUg5pO1VZ4B0Q1amk3OlXvlpXV.jpg",
    backdrop_path: "/wXsQvli6tWqja51PYxXNG1LFIGV.jpg",
    genre_ids: [16, 18, 10751],
    genres: [{ id: 16, name: "Animation" }, { id: 18, name: "Drama" }, { id: 10751, name: "Family" }],
    trailer_key: "lFzVJEksoDY",
    status: "Released",
    budget: 45000000,
    revenue: 968511805,
    director: "Roger Allers",
    featured: false,
    category: ["top_rated"],
    cast: [
      { id: 2059, name: "Matthew Broderick", character: "Adult Simba (voice)", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e0/Matthew_Broderick_2018.jpg/330px-Matthew_Broderick_2018.jpg" },
      { id: 11986, name: "Jeremy Irons", character: "Scar (voice)", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2f/Jeremy_Irons_Cannes_2013_%28cropped%29.jpg/330px-Jeremy_Irons_Cannes_2013_%28cropped%29.jpg" },
      { id: 15112, name: "James Earl Jones", character: "Mufasa (voice)", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/James_Earl_Jones_2013.jpg/330px-James_Earl_Jones_2013.jpg" }
    ]
  },
  {
    id: 634649,
    title: "Spider-Man: No Way Home",
    original_title: "Spider-Man: No Way Home",
    tagline: "The Multiverse unleashed.",
    overview: "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
    release_date: "2021-12-15",
    vote_average: 8.0,
    vote_count: 19800,
    popularity: 860,
    runtime: 148,
    poster_path: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    backdrop_path: "/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg",
    genre_ids: [28, 12, 878],
    genres: [{ id: 28, name: "Action" }, { id: 12, name: "Adventure" }, { id: 878, name: "Sci-Fi" }],
    trailer_key: "JfVOs4VSpmA",
    status: "Released",
    budget: 200000000,
    revenue: 1921847111,
    director: "Jon Watts",
    featured: false,
    category: ["trending"],
    cast: [
      { id: 1136406, name: "Tom Holland", character: "Peter Parker / Spider-Man", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/330px-Tom_Holland_by_Gage_Skidmore.jpg" },
      { id: 505710, name: "Zendaya", character: "Michelle 'MJ' Jones", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/28/Zendaya_-_2019_by_Glenn_Francis.jpg/330px-Zendaya_-_2019_by_Glenn_Francis.jpg" },
      { id: 71580, name: "Benedict Cumberbatch", character: "Stephen Strange / Doctor Strange", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/Benedict_Cumberbatch_filming_Sherlock_cropped.jpg/330px-Benedict_Cumberbatch_filming_Sherlock_cropped.jpg" }
    ]
  },
  {
    id: 299534,
    title: "Avengers: Endgame",
    original_title: "Avengers: Endgame",
    tagline: "Part of the journey is the end.",
    overview: "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe.",
    release_date: "2019-04-24",
    vote_average: 8.3,
    vote_count: 24700,
    popularity: 880,
    runtime: 181,
    poster_path: "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    backdrop_path: "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    genre_ids: [12, 878, 28],
    genres: [{ id: 12, name: "Adventure" }, { id: 878, name: "Sci-Fi" }, { id: 28, name: "Action" }],
    trailer_key: "TcMBFSGVi1c",
    status: "Released",
    budget: 356000000,
    revenue: 2797800564,
    director: "Anthony Russo",
    featured: false,
    category: ["trending", "top_rated"],
    cast: [
      { id: 3223, name: "Robert Downey Jr.", character: "Tony Stark / Iron Man", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/94/Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg/330px-Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg" },
      { id: 16828, name: "Chris Evans", character: "Steve Rogers / Captain America", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/03/Chris_Evans_2023.jpg/330px-Chris_Evans_2023.jpg" },
      { id: 74568, name: "Chris Hemsworth", character: "Thor Odinson", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/Chris_Hemsworth_by_Gage_Skidmore_3_%28cropped%29.jpg/330px-Chris_Hemsworth_by_Gage_Skidmore_3_%28cropped%29.jpg" }
    ]
  },
  {
    id: 76600,
    title: "Avatar: The Way of Water",
    original_title: "Avatar: The Way of Water",
    tagline: "Return to Pandora.",
    overview: "Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
    release_date: "2022-12-14",
    vote_average: 7.7,
    vote_count: 11400,
    popularity: 830,
    runtime: 192,
    poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    backdrop_path: "/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
    genre_ids: [878, 12, 28],
    genres: [{ id: 878, name: "Sci-Fi" }, { id: 12, name: "Adventure" }, { id: 28, name: "Action" }],
    trailer_key: "d9MyW72ELq0",
    status: "Released",
    budget: 350000000,
    revenue: 2320250281,
    director: "James Cameron",
    featured: false,
    category: ["trending"],
    cast: [
      { id: 65731, name: "Sam Worthington", character: "Jake Sully", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/Sam_Worthington_2013.jpg/330px-Sam_Worthington_2013.jpg" },
      { id: 8691, name: "Zoe Saldana", character: "Neytiri", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0d/Zoe_Saldana_by_Gage_Skidmore_2.jpg/330px-Zoe_Saldana_by_Gage_Skidmore_2.jpg" },
      { id: 10205, name: "Sigourney Weaver", character: "Kiri", profile_path: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/53/Sigourney_Weaver_by_Gage_Skidmore_2.jpg/330px-Sigourney_Weaver_by_Gage_Skidmore_2.jpg" }
    ]
  }
];
