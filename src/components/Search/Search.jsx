import { useState } from 'react'
import './Search.css'
import React from 'react'


function Search({ search, setSearch }) {
  return (
    //input field to search pokemon by name and updating the search state on change
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