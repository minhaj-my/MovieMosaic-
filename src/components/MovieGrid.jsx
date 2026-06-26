import Spinner from "./Spinner";
import MovieCard from "./MovieCard";

const MovieGrid = ({ movies, isLoading, errorMessage }) => (
  <section className="mt-10">
    <h2 className="text-white text-2xl mb-6">All Movies</h2>
    {isLoading ? (
      <Spinner />
    ) : errorMessage ? (
      <p className="text-red-500">{errorMessage}</p>
    ) : (
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
    )}
  </section>
);

export default MovieGrid;
