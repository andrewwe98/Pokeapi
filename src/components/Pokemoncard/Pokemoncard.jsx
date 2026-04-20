import { Link } from 'react-router-dom'
import pokemoncard from '../../assets/pokemoncard.jpg'

const Pokemoncard = ({ pokemon }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,260px))] justify-center gap-6">
      {pokemon.map((poke) => (
        <article
          key={poke.id}
          className="group w-full rounded-[1.75rem] border border-white/15 bg-slate-950/55 p-4 shadow-xl shadow-slate-950/25 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-amber-300/50 hover:shadow-2xl"
        >
          <div className="relative mx-auto w-full max-w-[260px]">
            <img src={pokemoncard} alt="Pokemon Card" className="w-full" />
            <img
              src={poke.sprites.other['official-artwork'].front_default || poke.sprites.front_default}
              alt={poke.name}
              className="absolute left-1/2 top-[30%] w-[52%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_16px_24px_rgba(15,23,42,0.45)] transition duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-[20%] left-1/2 w-[72%] -translate-x-1/2 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-700">
                #{poke.id}
              </p>
              <h2 className="mt-1 text-lg font-black capitalize tracking-wide text-slate-900">
                {poke.name}
              </h2>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {poke.types.map(({ type }) => (
              <span
                key={type.name}
                className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-100"
              >
                {type.name}
              </span>
            ))}
          </div>

          <Link
            to={`/pokemon/${poke.name}`}
            className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-amber-300 via-orange-400 to-rose-500 px-4 py-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-950 transition hover:brightness-110"
          >
            See Description
          </Link>
        </article>
      ))}
    </div>
  )
}

export default Pokemoncard;
