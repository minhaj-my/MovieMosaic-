import { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import { getTrendingMovies } from "../utily/api.js";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const useMovies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);

  useDebounce(() => setDebouncedTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc`;
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      if (!data.results || data.results.length === 0) {
        setMovieList([]);
        setErrorMessage("No movies found");
        return;
      }
      setMovieList(data.results);
    } catch (error) {
      setErrorMessage("Error fetching movies. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedTerm);
  }, [debouncedTerm]);

  useEffect(() => {
    getTrendingMovies()
      .then(setTrendingMovies)
      .catch((err) => console.error("Error loading trending:", err));
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    movieList,
    isLoading,
    errorMessage,
    trendingMovies,
  };
};
