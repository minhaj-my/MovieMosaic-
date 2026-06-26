const TrendingSection = ({ movies }) => {
  if (!movies.length) return null;

  return (
    <section className="trending mt-6">
      <h2 className="text-white text-xl mb-2">Trending Movies</h2>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
        {movies.map((movie) => (
          <div
            key={movie.$id}
            className="w-full h-40 p-6 bg-white/15 backdrop-blur-[7px] transition-opacity duration-300 hover:opacity-70 border border-white/10 shadow-lg relative overflow-hidden rounded-md flex flex-col items-center"
          >
            <img
              src={movie.poster_url || "/placeholder.png"}
              alt={movie.title}
              className="w-full h-20 object-cover rounded"
            />
            <p className="text-white text-sm mt-1 text-center">{movie.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;
