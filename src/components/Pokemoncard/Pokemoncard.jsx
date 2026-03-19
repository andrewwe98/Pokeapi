import React from 'react' 
import pokemoncard from '../../assets/pokemoncard.jpg'

const Pokemoncard = ({ pokemon }) => {
    // mapping through the pokemon array and displaying each pokemon image and name using css inline-block and absolute postioning.
    return (
        <div className='pokemon-card' style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px', padding: '10px' }}>
           
            {pokemon.map((poke) => (
                <div key={poke.id} className='pokemon-card-item'>
                    <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                        <img src={pokemoncard} id="pokemoncard" alt="Pokemon Card" style={{ width: '100%', height: 'auto' }} />
                        <h2 style={{ position: 'absolute', bottom: '50px', left: '50%', transform: 'translateX(-50%)', fontSize: '14px', margin: 0 }}>
                            {poke.name}
                        </h2>
                        <img 
                            src={poke.sprites.front_default} 
                            id="sprite" 
                            alt={poke.name}
                            style={{ position: 'absolute', bottom: '120px', left: '50%', transform: 'translateX(-50%)', width: '60px', height: 'auto' }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Pokemoncard;