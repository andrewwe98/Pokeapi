function Search({ search, setSearch }) {
  return (
    <input
      type="text"
      name="search"
      placeholder="Search Pokemon"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-base text-white placeholder:text-slate-300 shadow-lg shadow-slate-950/20 outline-none backdrop-blur transition focus:border-amber-300 focus:bg-white/15"
    />
  )
}

export default Search;
