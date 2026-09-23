import { SPRITE_BASE_URL } from "./config.js";

export function getIdFromUrl(url) {
  // url looks like "https://pokeapi.co/api/v2/pokemon/25/"
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

export const TYPE_COLORS = {
  normal: { bg: "#94a3b8", glow: "rgba(148, 163, 184, 0.4)", text: "#0f172a" },
  fire: { bg: "#f97316", glow: "rgba(249, 115, 22, 0.5)", text: "#ffffff" },
  water: { bg: "#0ea5e9", glow: "rgba(14, 165, 233, 0.5)", text: "#ffffff" },
  grass: { bg: "#22c55e", glow: "rgba(34, 197, 94, 0.5)", text: "#ffffff" },
  electric: { bg: "#eab308", glow: "rgba(234, 179, 8, 0.5)", text: "#0f172a" },
  ice: { bg: "#06b6d4", glow: "rgba(6, 182, 212, 0.5)", text: "#0f172a" },
  fighting: { bg: "#ef4444", glow: "rgba(239, 68, 68, 0.5)", text: "#ffffff" },
  poison: { bg: "#a855f7", glow: "rgba(168, 85, 247, 0.5)", text: "#ffffff" },
  ground: { bg: "#d97706", glow: "rgba(217, 119, 6, 0.5)", text: "#ffffff" },
  flying: { bg: "#60a5fa", glow: "rgba(96, 165, 250, 0.5)", text: "#0f172a" },
  psychic: { bg: "#ec4899", glow: "rgba(236, 72, 153, 0.5)", text: "#ffffff" },
  bug: { bg: "#84cc16", glow: "rgba(132, 204, 22, 0.5)", text: "#0f172a" },
  rock: { bg: "#78716c", glow: "rgba(120, 113, 108, 0.5)", text: "#ffffff" },
  ghost: { bg: "#6366f1", glow: "rgba(99, 102, 241, 0.5)", text: "#ffffff" },
  dragon: { bg: "#4f46e5", glow: "rgba(79, 70, 229, 0.5)", text: "#ffffff" },
  steel: { bg: "#64748b", glow: "rgba(100, 116, 139, 0.5)", text: "#ffffff" },
  fairy: { bg: "#f472b6", glow: "rgba(244, 114, 182, 0.5)", text: "#0f172a" },
  dark: { bg: "#334155", glow: "rgba(51, 65, 85, 0.5)", text: "#ffffff" },
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
