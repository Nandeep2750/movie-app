export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_READ_ACCESS_TOKEN: process.env.EXPO_PUBLIC_API_READ_ACCESS_TOKEN,
  headers: {
    'Authorization': `Bearer ${process.env.EXPO_PUBLIC_API_READ_ACCESS_TOKEN}`,
    'accept': 'application/json'
  }
};

export const fetchMovies = async ( {query = ''}: {query: string}) => {
  const url = query
  ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
  : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
  const response = await fetch(url, {
    headers: TMDB_CONFIG.headers
  });
  const data = await response.json();
  return data;
};
