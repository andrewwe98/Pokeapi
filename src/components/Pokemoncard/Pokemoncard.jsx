import React from 'react' 
import pokemoncard from '../../assets/pokemoncard.jpg'

const Pokemoncard = ({ pokemon }) => {
    return (
        <div className='pokemon-card'>
            {pokemon.map((poke) => (
                <div key={poke.id} className='pokemon-card-item'>
                    <img src={pokemoncard} id = "pokemoncard" alt="Pokemon Card" />
                    <h2>{poke.name}</h2>
                    <img src={poke.sprites.front_default} id='sprite' alt={poke.name} />
                </div>
            ))}
        </div>
    );
}