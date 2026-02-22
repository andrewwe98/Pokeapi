import { useState } from 'react'
import './Search.css'


function Search({ search, setSearch }) {
  return (
    <input 
      type="text"
      name="search"
      placeholder='Search Pokemon'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="navbar-search"
    />
  );
}


export default Search;