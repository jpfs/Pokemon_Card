export const API_CONFIG = {
  BASE_URL: "https://pokeapi.co/api/v2",
  POKEMON_COUNT: 1010,
  DEFAULT_IMAGE:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR:
    "Network error occurred. Please check your internet connection.",
  API_ERROR: "Failed to fetch Pokemon data. Please try again.",
  UNKNOWN_ERROR: "An unknown error occurred. Please try again.",
  TIMEOUT_ERROR: "Request timed out. Please try again.",
};

export const POKEMON_TYPES = {
  normal: {
    bg: "bg-gray-400",
    text: "text-white",
    color: "#A8A878",
  },
  fire: {
    bg: "bg-red-500",
    text: "text-white",
    color: "#F08030",
  },
  water: {
    bg: "bg-blue-500",
    text: "text-white",
    color: "#6890F0",
  },
  electric: {
    bg: "bg-yellow-400",
    text: "text-gray-800",
    color: "#F8D030",
  },
  grass: {
    bg: "bg-green-500",
    text: "text-white",
    color: "#78C850",
  },
  ice: {
    bg: "bg-blue-200",
    text: "text-gray-800",
    color: "#98D8D8",
  },
  fighting: {
    bg: "bg-red-700",
    text: "text-white",
    color: "#C03028",
  },
  poison: {
    bg: "bg-purple-500",
    text: "text-white",
    color: "#A040A0",
  },
  ground: {
    bg: "bg-yellow-600",
    text: "text-white",
    color: "#E0C068",
  },
  flying: {
    bg: "bg-indigo-400",
    text: "text-white",
    color: "#A890F0",
  },
  psychic: {
    bg: "bg-pink-500",
    text: "text-white",
    color: "#F85888",
  },
  bug: {
    bg: "bg-green-400",
    text: "text-white",
    color: "#A8B820",
  },
  rock: {
    bg: "bg-yellow-800",
    text: "text-white",
    color: "#B8A038",
  },
  ghost: {
    bg: "bg-purple-700",
    text: "text-white",
    color: "#705898",
  },
  dragon: {
    bg: "bg-indigo-700",
    text: "text-white",
    color: "#7038F8",
  },
  dark: {
    bg: "bg-gray-800",
    text: "text-white",
    color: "#705848",
  },
  steel: {
    bg: "bg-gray-500",
    text: "text-white",
    color: "#B8B8D0",
  },
  fairy: {
    bg: "bg-pink-300",
    text: "text-gray-800",
    color: "#EE99AC",
  },
};

export const APP_INFO = {
  TITLE: "PokeAPI Vue Challenge",
  SUBTITLE: "Gotta catch 'em all!",
  VERSION: "1.0.0",
  AUTHOR: "Goparity Frontend Challenge",
  DESCRIPTION: "Gotta catch 'em all!",
};
