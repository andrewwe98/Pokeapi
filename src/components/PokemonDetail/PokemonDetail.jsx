import { Link, useParams } from 'react-router-dom'
import pokemoncard from '../../assets/pokemoncard.jpg'

function formatLabel(value) {
  return value.replace(/-/g, ' ')
}

function PokemonDetail({ pokemon, loading }) {
  const { pokemonName } = useParams()
  const selectedPokemon = pokemon.find((poke) => poke.name === pokemonName)

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-lg font-semibold text-white shadow-lg backdrop-blur">
          Loading Pokemon details...
        </div>
      </div>
    )
  }

  if (!selectedPokemon) {
    return (
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 text-center">
        <div className="rounded-[2rem] border border-white/20 bg-slate-950/60 p-8 shadow-2xl backdrop-blur">
          <h1 className="text-3xl font-black text-white">Pokemon not found</h1>
          <p className="mt-3 text-slate-200">
            We could not find that Pokemon in the current list.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-full bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-200"
          >
            Back to Pokedex
          </Link>
        </div>
      </div>
    )
  }

  const types = selectedPokemon.types.map(({ type }) => formatLabel(type.name))
  const abilities = selectedPokemon.abilities.map(({ ability }) => formatLabel(ability.name))
  const stats = selectedPokemon.stats.map(({ base_stat, stat }) => ({
    label: formatLabel(stat.name),
    value: base_stat,
  }))

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to="/"
        className="mb-6 inline-flex w-fit rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
      >
        Back to all Pokemon
      </Link>

      <section className="grid gap-8 rounded-[2rem] border border-white/20 bg-slate-950/60 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur lg:grid-cols-[minmax(280px,380px)_1fr] lg:p-8">
        <div className="flex flex-col items-center rounded-[1.75rem] bg-gradient-to-b from-amber-200/20 to-orange-500/10 p-5">
          <div className="relative w-full max-w-sm">
            <img
              src={pokemoncard}
              alt="Pokemon Card"
              className="w-full drop-shadow-[0_20px_35px_rgba(15,23,42,0.5)]"
            />
            <img
              src={
                selectedPokemon.sprites.other['official-artwork'].front_default ||
                selectedPokemon.sprites.front_default
              }
              alt={selectedPokemon.name}
              className="absolute left-1/2 top-[28%] w-[54%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_18px_24px_rgba(15,23,42,0.45)]"
            />
            <div className="absolute bottom-[21%] left-1/2 w-[72%] -translate-x-1/2 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-slate-700">
                #{selectedPokemon.id}
              </p>
              <h1 className="mt-1 text-2xl font-black capitalize tracking-wide text-slate-900">
                {selectedPokemon.name}
              </h1>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {types.map((type) => (
              <span
                key={type}
                className="rounded-full bg-white/80 px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] text-slate-900"
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Pokemon Details</p>
            <h2 className="mt-2 text-4xl font-black capitalize text-white">
              {selectedPokemon.name}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-200">
              View key details for this Pokemon, including types, size, abilities, and battle
              stats.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <p className="text-sm uppercase tracking-[0.25em] text-amber-200">Profile</p>
              <div className="mt-4 grid gap-3 text-slate-100">
                <p>
                  <span className="font-semibold text-white">Name:</span>{' '}
                  <span className="capitalize">{selectedPokemon.name}</span>
                </p>
                <p>
                  <span className="font-semibold text-white">Type:</span> {types.join(', ')}
                </p>
                <p>
                  <span className="font-semibold text-white">Height:</span>{' '}
                  {selectedPokemon.height / 10} m
                </p>
                <p>
                  <span className="font-semibold text-white">Weight:</span>{' '}
                  {selectedPokemon.weight / 10} kg
                </p>
                <p>
                  <span className="font-semibold text-white">Base experience:</span>{' '}
                  {selectedPokemon.base_experience}
                </p>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <p className="text-sm uppercase tracking-[0.25em] text-amber-200">Abilities</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {abilities.map((ability) => (
                  <span
                    key={ability}
                    className="rounded-full border border-cyan-300/30 bg-cyan-400/15 px-3 py-2 text-sm font-semibold capitalize text-cyan-50"
                  >
                    {ability}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-amber-200">Battle Stats</p>
            <div className="mt-5 grid gap-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm text-slate-100">
                    <span className="font-semibold capitalize">{stat.label}</span>
                    <span>{stat.value}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-300 via-orange-400 to-rose-500"
                      style={{ width: `${Math.min((stat.value / 180) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default PokemonDetail
