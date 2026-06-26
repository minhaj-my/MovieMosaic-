const MovieCard = ({ movie }) => {
  // safely get poster and title
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "./no-image.png"; // fallback image if poster_path is missing

  const title = movie.title || movie.original_title || "Untitled";

  return (
    <div className="movie-card glass-card text-white p-4 rounded-lg shadow-lg w-60 flex-shrink-0">
      <img
        src={poster}
        alt={title}
        className="w-full h-20 object-cover rounded-md mb-2"
      />
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="content flex items-center text-sm sm:text-base md:text-lg gap-2 mt-2 text-gray-300">
        <div className="rating flex items-center gap-1">
          <img
            src="/star.svg"
            alt="starIcon"
            className="w-4 h-4 sm:w-5 sm:h-5"
          />
          <p>{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</p>
        </div>

        <span className="mx-1">•</span>

        <p className="lang">{movie.original_language || "N/A"}</p>

        <span className="mx-1">•</span>

        <p className="year">
          {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
