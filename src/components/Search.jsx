const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search bg-white/15 backdrop-blur-[7px]    border border-white/10 shadow-lg     ">
      <div>
        <img src="search.svg" alt="" />
        <input
          type="text"
          placeholder="search for through thousands of movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};
export default Search;
