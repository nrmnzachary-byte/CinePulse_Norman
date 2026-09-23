import { SPRITE_BASE_URL } from "./config.js";

export function getIdFromUrl(url) {
  if (!url) return "";
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

export function capitalize(name) {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function getSpriteUrl(id) {
  return `${SPRITE_BASE_URL}/${id}.png`;
}

export function getShinySpriteUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`;
}

export function getOfficialArtworkUrl(id, isShiny = false) {
  if (isShiny) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`;
  }
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function getCryAudioUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`;
}

// Vibrant elemental palettes with modern gradients and glow effects
export const TYPE_COLORS = {
  normal: { 
    bg: "#94a3b8", 
    gradient: "linear-gradient(135deg, #94a3b8 0%, #64748b 100%)", 
    glow: "rgba(148, 163, 184, 0.6)", 
    text: "#0f172a",
    icon: "🔘" 
  },
  fire: { 
    bg: "#ff5722", 
    gradient: "linear-gradient(135deg, #ff6b35 0%, #f43f5e 50%, #dc2626 100%)", 
    glow: "rgba(255, 87, 34, 0.7)", 
    text: "#ffffff",
    icon: "🔥" 
  },
  water: { 
    bg: "#0284c7", 
    gradient: "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 50%, #0369a1 100%)", 
    glow: "rgba(14, 165, 233, 0.7)", 
    text: "#ffffff",
    icon: "💧" 
  },
  grass: { 
    bg: "#16a34a", 
    gradient: "linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #15803d 100%)", 
    glow: "rgba(34, 197, 94, 0.7)", 
    text: "#ffffff",
    icon: "🌿" 
  },
  electric: { 
    bg: "#eab308", 
    gradient: "linear-gradient(135deg, #fef08a 0%, #eab308 50%, #ca8a04 100%)", 
    glow: "rgba(234, 179, 8, 0.8)", 
    text: "#0f172a",
    icon: "⚡" 
  },
  ice: { 
    bg: "#06b6d4", 
    gradient: "linear-gradient(135deg, #a5f3fc 0%, #22d3ee 50%, #0891b2 100%)", 
    glow: "rgba(6, 182, 212, 0.7)", 
    text: "#0f172a",
    icon: "❄️" 
  },
  fighting: { 
    bg: "#dc2626", 
    gradient: "linear-gradient(135deg, #f87171 0%, #dc2626 50%, #991b1b 100%)", 
    glow: "rgba(220, 38, 38, 0.7)", 
    text: "#ffffff",
    icon: "🥊" 
  },
  poison: { 
    bg: "#9333ea", 
    gradient: "linear-gradient(135deg, #c084fc 0%, #a855f7 50%, #7e22ce 100%)", 
    glow: "rgba(168, 85, 247, 0.7)", 
    text: "#ffffff",
    icon: "☠️" 
  },
  ground: { 
    bg: "#d97706", 
    gradient: "linear-gradient(135deg, #fde68a 0%, #d97706 50%, #b45309 100%)", 
    glow: "rgba(217, 119, 6, 0.7)", 
    text: "#ffffff",
    icon: "🏜️" 
  },
  flying: { 
    bg: "#6366f1", 
    gradient: "linear-gradient(135deg, #93c5fd 0%, #60a5fa 50%, #3b82f6 100%)", 
    glow: "rgba(96, 165, 250, 0.7)", 
    text: "#0f172a",
    icon: "🦅" 
  },
  psychic: { 
    bg: "#ec4899", 
    gradient: "linear-gradient(135deg, #f472b6 0%, #ec4899 50%, #db2777 100%)", 
    glow: "rgba(236, 72, 153, 0.8)", 
    text: "#ffffff",
    icon: "🔮" 
  },
  bug: { 
    bg: "#65a30d", 
    gradient: "linear-gradient(135deg, #a3e635 0%, #84cc16 50%, #4d7c0f 100%)", 
    glow: "rgba(132, 204, 22, 0.7)", 
    text: "#0f172a",
    icon: "🐛" 
  },
  rock: { 
    bg: "#78716c", 
    gradient: "linear-gradient(135deg, #d6d3d1 0%, #a8a29e 50%, #57534e 100%)", 
    glow: "rgba(120, 113, 108, 0.6)", 
    text: "#ffffff",
    icon: "🪨" 
  },
  ghost: { 
    bg: "#4f46e5", 
    gradient: "linear-gradient(135deg, #818cf8 0%, #6366f1 50%, #4338ca 100%)", 
    glow: "rgba(99, 102, 241, 0.8)", 
    text: "#ffffff",
    icon: "👻" 
  },
  dragon: { 
    bg: "#4338ca", 
    gradient: "linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #312e81 100%)", 
    glow: "rgba(79, 70, 229, 0.8)", 
    text: "#ffffff",
    icon: "🐉" 
  },
  steel: { 
    bg: "#475569", 
    gradient: "linear-gradient(135deg, #cbd5e1 0%, #94a3b8 50%, #475569 100%)", 
    glow: "rgba(100, 116, 139, 0.6)", 
    text: "#ffffff",
    icon: "⚙️" 
  },
  fairy: { 
    bg: "#f472b6", 
    gradient: "linear-gradient(135deg, #fbcfe8 0%, #f472b6 50%, #e11d48 100%)", 
    glow: "rgba(244, 114, 182, 0.8)", 
    text: "#0f172a",
    icon: "✨" 
  },
  dark: { 
    bg: "#1e293b", 
    gradient: "linear-gradient(135deg, #475569 0%, #1e293b 50%, #0f172a 100%)", 
    glow: "rgba(51, 65, 85, 0.7)", 
    text: "#ffffff",
    icon: "🌑" 
  },
};

export const GENERATIONS = [
  { id: "all", name: "All Pokémon", offset: 0, limit: 1025 },
  { id: "gen1", name: "Gen I (Kanto)", offset: 0, limit: 151 },
  { id: "gen2", name: "Gen II (Johto)", offset: 151, limit: 100 },
  { id: "gen3", name: "Gen III (Hoenn)", offset: 251, limit: 135 },
  { id: "gen4", name: "Gen IV (Sinnoh)", offset: 386, limit: 107 },
  { id: "gen5", name: "Gen V (Unova)", offset: 493, limit: 156 },
  { id: "gen6", name: "Gen VI (Kalos)", offset: 649, limit: 72 },
  { id: "gen7", name: "Gen VII (Alola)", offset: 721, limit: 88 },
  { id: "gen8", name: "Gen VIII (Galar)", offset: 809, limit: 96 },
  { id: "gen9", name: "Gen IX (Paldea)", offset: 905, limit: 120 },
];

// Web Audio API Retro Sound Effects Engine
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playTone(freq, type = "sine", duration = 0.1, gainVal = 0.15) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  playBlip() {
    this.playTone(880, "square", 0.06, 0.08);
  }

  playCatch() {
    // 3-tone Pokéball catch fanfare
    this.playTone(523.25, "triangle", 0.12, 0.15);
    setTimeout(() => this.playTone(659.25, "triangle", 0.12, 0.15), 110);
    setTimeout(() => this.playTone(783.99, "triangle", 0.25, 0.2), 220);
  }

  playVictory() {
    // Mini-game triumph
    const notes = [587.33, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, "triangle", 0.16, 0.18), idx * 90);
    });
  }

  playShiny() {
    // Magical sparkle chime
    const notes = [1046.5, 1318.5, 1567.98, 2093.0];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, "sine", 0.18, 0.15), idx * 70);
    });
  }
}

export const sound = new SoundEngine();

// LocalStorage Team/Favorites Manager
const TEAM_KEY = "pokedex_my_team_v1";

export function getMyTeam() {
  try {
    const raw = localStorage.getItem(TEAM_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveMyTeam(team) {
  try {
    localStorage.setItem(TEAM_KEY, JSON.stringify(team.slice(0, 6)));
  } catch {
    // Ignore storage issues
  }
}

export function isInTeam(pokemonName) {
  const team = getMyTeam();
  return team.some((p) => p.name.toLowerCase() === pokemonName.toLowerCase());
}

export function toggleTeamMember(pokemon) {
  const team = getMyTeam();
  const index = team.findIndex((p) => p.name.toLowerCase() === pokemon.name.toLowerCase());
  let nextTeam;
  let added = false;
  if (index >= 0) {
    nextTeam = team.filter((_, i) => i !== index);
  } else {
    if (team.length >= 6) {
      return { success: false, reason: "Your party is full (maximum 6 Pokémon)!" };
    }
    nextTeam = [
      ...team,
      {
        name: pokemon.name,
        id: pokemon.id,
        sprite:
          pokemon.sprites?.other?.["official-artwork"]?.front_default ||
          pokemon.sprites?.front_default ||
          getSpriteUrl(pokemon.id),
        types: pokemon.types?.map((t) => t.type.name) || [],
      },
    ];
    added = true;
    sound.playCatch();
  }
  saveMyTeam(nextTeam);
  return { success: true, added, team: nextTeam };
}
