export const getTrendingMovies = async (limit = 5) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`,
    );
    const data = await response.json();
    return data.results.slice(0, limit).map((movie) => ({
      $id: movie.id,
      title: movie.title,
      poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      movie_id: movie.id,
      count: movie.popularity,
    }));
  } catch (error) {
    console.error("Error trending movies:", error);
    return [];
  }
};
