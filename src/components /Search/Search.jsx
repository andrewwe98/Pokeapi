import { useState } from 'react'



function Search() {


const Search = (search, setSearch) => {


  return (
   <input 
   type="text"
   placeholder='Searching'
   value={search}
   onChange = {(e) => setSearch(e.target.value)}
   />
  );

};
}
export default Search;