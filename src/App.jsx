import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Search from './components/Search/Search.jsx'

function App() {
const [search, setSearch] = useState("");
  return (
    <div className="App">
      <div className="navbar">
       <div className="nav-middle flex-div"></div>
       <div className='search flex-div'>
      <Search search={search} setSearch={setSearch} />
       </div>
      </div>
      </div>
  );
}

export default App;
