import { MovieDetails } from "@/interfaces/interfaces";

export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_READ_ACCESS_TOKEN: process.env.EXPO_PUBLIC_API_READ_ACCESS_TOKEN,
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_READ_ACCESS_TOKEN}`,
    accept: "application/json",
  },
};

export const fetchMovies = async ({ query = "" }: { query: string }) => {
  try {
    const url = query
      ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(
          query
        )}`
      : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
    const response = await fetch(url, {
      headers: TMDB_CONFIG.headers,
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId: number): Promise<MovieDetails> => {
  try {
    const url = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}`;
    const response = await fetch(url, {
      headers: TMDB_CONFIG.headers,
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
