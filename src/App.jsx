import TrendingSection from "./components/TrendingSection";
import MovieGrid from "./components/MovieGrid";
import Search from "./components/Search.jsx";
import ParticleBackground from "./utily/background.jsx";
import { useMovies } from "./hooks/useMovies";
import "./App.css";

const App = () => {
  const {
    searchTerm,
    setSearchTerm,
    movieList,
    isLoading,
    errorMessage,
    trendingMovies,
  } = useMovies();

  return (
    <main>
      {/*<ParticleBackground />*/}
      <div className="bg-black">
        <header>
          <h1>
            Find <span className="text-gradient">Movies</span> you'll Enjoy
            without the Hassle
          </h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <TrendingSection movies={trendingMovies} />
        <MovieGrid
          movies={movieList}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      </div>
    </main>
  );
};

export default App;
