import React, { useState, useEffect } from 'react';
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
  const [opened, setOpened] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  // Check if there is a match
  //If there are 2 in the opened array check if they match
  useEffect(() => {
    if (opened.length < 2) return;
    const firstPokemon = doublePokemon[opened[0]];
    const secondPokemon = doublePokemon[opened[1]];

    if (firstPokemon.name === secondPokemon.name) {
      setMatched((matched) => [...matched, firstPokemon.id]);
    }
  }, [opened]);

  // Clear card after it had been selected
  useEffect(() => {
    if (opened.length === 2) setTimeout(() => setOpened([]), 800);
  }, [opened]);

  const flipCard = (index) => {
    setMoves((moves) => moves + 1);
    setOpened((opened) => [...opened, index]);
  };

  // Check if there is a winner

  useEffect(() => {
    if (matched.length === pokemon.length) alert('You won!');
  }, [matched]);

  return (
    <div className='app'>
      <p>
        {moves} <strong>Moves</strong>
      </p>
      <button
        onClick={() => {
          setMatched([]);
          setMoves(0);
          setOpened([]);
        }}
      >
        Reset!
      </button>
      <div className='cards'>
        {doublePokemon.map((pokemon, index) => {
          let isFlipped = false;

          if (opened.includes(index)) isFlipped = true;
          if (matched.includes(pokemon.id)) isFlipped = true;

          return (
            <PokemonCard
              pokemon={pokemon}
              key={index}
              isFlipped={isFlipped}
              flipCard={flipCard}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
}

const PokemonCard = ({ pokemon, isFlipped, index, flipCard }) => (
  <button
    className={`pokemon-card ${isFlipped ? 'flipped' : ''}`}
    onClick={() => flipCard(index)}
  >
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
  </button>
);
