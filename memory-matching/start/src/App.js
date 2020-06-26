import React from 'react';
import './App.css';
import shuffe from 'lodash.shuffle';

// image for the pokemon
// https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png

const pokemon = [
  { id: 4, name: 'charizard' },
  { id: 10, name: 'caterpie' },
  { id: 77, name: 'ponyta' },
  { id: 108, name: 'lickitung' },
  { id: 132, name: 'ditto' },
  { id: 133, name: 'eevee' },
];

const doublePokemon = shuffe([...pokemon, ...pokemon]);

export default function App() {
  return (
    <div className='app'>
      <div className='cards'>
        {doublePokemon.map((pokemon, index) => (
          <PokemonCard pokemon={pokemon} index={index} />
        ))}
      </div>
    </div>
  );
}

const PokemonCard = ({ pokemon, index }) => (
  <div className='pokemon-card' key={index}>
    <div className='inner'>
      <div className='front'>
        <img
          src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
          alt={pokemon.name}
          width='100'
        />
      </div>
      <div className='back'>?</div>
    </div>
  </div>
);
