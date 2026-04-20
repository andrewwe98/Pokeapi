import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Search from './components/Search/Search'
import PokemonCard from './components/Pokemoncard/Pokemoncard'
import PokemonDetail from './components/PokemonDetail/PokemonDetail'

const POKEMON_LIMIT = 1025
const POKEMON_BATCH_SIZE = 40

async function fetchJson(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json()
}

function App() {
  const [pokemon, setPokemon] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setError('')
        const data = await fetchJson(`https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_LIMIT}`)
        const loadedPokemon = []

        for (let index = 0; index < data.results.length; index += POKEMON_BATCH_SIZE) {
          const batch = data.results.slice(index, index + POKEMON_BATCH_SIZE)
          const batchResults = await Promise.allSettled(
            batch.map((poke) => fetchJson(poke.url)),
          )

          batchResults.forEach((result) => {
            if (result.status === 'fulfilled') {
              loadedPokemon.push(result.value)
            }
          })
        }

        if (loadedPokemon.length === 0) {
          throw new Error('No Pokemon could be loaded.')
        }

        loadedPokemon.sort((firstPokemon, secondPokemon) => firstPokemon.id - secondPokemon.id)
        setPokemon(loadedPokemon)
      } catch (fetchError) {
        console.error('Error fetching Pokemon data:', fetchError)
        setError('Unable to load Pokemon right now.')
      } finally {
        setLoading(false)
      }
    }

    fetchPokemon()
  }, [])

  const filteredPokemon = pokemon.filter((poke) =>
    poke.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fef08a_0%,_#f97316_35%,_#172554_100%)] text-slate-50">
      <Routes>
        <Route
          path="/"
          element={
            <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
              <section className="mb-8 rounded-[2rem] border border-white/20 bg-slate-950/55 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur md:p-8">
                <p className="text-sm uppercase tracking-[0.4em] text-amber-300">Pokedex</p>
                <div className="mt-3 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
                  <div className="max-w-2xl">
                    <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                      Discover every Pokemon in a better card view.
                    </h1>
                    <p className="mt-3 text-base text-slate-200 sm:text-lg">
                      Search by name, browse the deck, and open a full description page for any
                      Pokemon you want to inspect.
                    </p>
                  </div>
                  <div className="w-full justify-self-start lg:justify-self-end">
                    <label className="mb-3 block text-sm font-semibold uppercase tracking-[0.25em] text-amber-100">
                      Search Pokemon
                    </label>
                    <Search search={search} setSearch={setSearch} />
                  </div>
                </div>
              </section>

              {loading ? (
                <div className="flex flex-1 items-center justify-center">
                  <div className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-lg font-semibold text-white shadow-lg backdrop-blur">
                    Loading Pokemon...
                  </div>
                </div>
              ) : error ? (
                <div className="rounded-3xl border border-red-300/40 bg-red-950/70 p-6 text-center text-red-100 shadow-lg">
                  {error}
                </div>
              ) : (
                <>
                  <div className="mb-5 flex items-center justify-between gap-3 px-1">
                    <p className="text-sm font-medium text-slate-100">
                      Showing {filteredPokemon.length} Pokemon
                    </p>
                    <p className="text-xs uppercase tracking-[0.25em] text-amber-200/80">
                      Choose a card to view details
                    </p>
                  </div>
                  {filteredPokemon.length > 0 ? (
                    <PokemonCard pokemon={filteredPokemon} />
                  ) : (
                    <div className="rounded-[1.75rem] border border-white/15 bg-slate-950/55 p-10 text-center shadow-xl backdrop-blur">
                      <p className="text-2xl font-black text-white">No Pokemon found</p>
                      <p className="mt-3 text-slate-200">
                        Try a different name in the search box to see matching cards.
                      </p>
                    </div>
                  )}
                </>
              )}
            </main>
          }
        />
        <Route
          path="/pokemon/:pokemonName"
          element={<PokemonDetail pokemon={pokemon} loading={loading} />}
        />
      </Routes>
    </div>
  )
}

export default App
