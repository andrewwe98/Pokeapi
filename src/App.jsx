import { useState, useEffect } from 'react'
import './App.css'
import Search from './components/Search/Search'
import PokemonCard from './components/Pokemoncard/Pokemoncard'

function App() {
  //pokemon state
const [pokemon, setPokemon] = useState([]);
//search state 
const [search, setSearch] = useState("");
//loading state
const [loading, setLoading] = useState(true);
useEffect(() => {
  fetch('https://pokeapi.co/api/v2/pokemon?limit=1025')
    .then((response) => response.json())
    .then((data) => {
      const pokemonData = data.results.map((poke) =>
        fetch(poke.url).then((response) => response.json())
      );
      Promise.all(pokemonData).then((pokemonDetails) => setPokemon(pokemonDetails));
    })
    .catch((error) => console.error('Error fetching Pokemon data:', error));
}, []);
if (1025 === pokemon.length && loading) {
  setLoading(false);
}
if (loading) {
  return <div className="loading">Loading...</div>;
}
const filteredPokemon = pokemon.filter((poke) => poke.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="App">
      <div className="navbar">
        <div className="nav-middle flex-div"></div>
        <div className='search flex-div'>
          <Search search={search} setSearch={setSearch} />
        </div>
      </div>
      <div className='Pokecard'>
        <PokemonCard pokemon= {filteredPokemon} />
      </div>
    </div>
  );
}

export default App;
