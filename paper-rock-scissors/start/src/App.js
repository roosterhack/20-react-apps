import React, { useState, useEffect } from 'react';
import Rock from './icons/Rock';
import Paper from './icons/Paper';
import Scissors from './icons/Scissors';
import './App.css';

const choices = [
  { id: 1, name: 'rock', component: Rock, losesTo: 2 },
  { id: 2, name: 'paper', component: Paper, losesTo: 3 },
  { id: 3, name: 'scissors', component: Scissors, losesTo: 1 },
];

//1.handle wins and losses
//2.determin the winner based on choices
//3. reset the game

export default function App() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [wins, setWins] = useState(0);
  const [loses, setLoses] = useState(0);
  const [gameState, setGameState] = useState(null); // win,lose,draw

  useEffect(() => {
    restartGame();
  }, []);

  const handleUserChoice = (choice) => {
    const chosenChoice = choices.find((c) => c.id === choice);
    setUserChoice(chosenChoice);

    //determin the winner
    if (chosenChoice.losesTo === computerChoice.id) {
      setGameState('lose');
      setLoses((loses) => loses + 1);
    }
    if (computerChoice.losesTo === chosenChoice.id) {
      setGameState('win');
      setWins((wins) => wins + 1);
    }
    if (computerChoice.id === chosenChoice.id) {
      setGameState('draw');
    }
  };

  const renderComponent = (choice) => {
    const Component = choice.component;
    return <Component />;
  };

  const restartGame = () => {
    setGameState(null);
    setUserChoice(null);
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
  };

  return (
    <div className='app'>
      {/* information goes here */}
      <div className='info'>
        <h2>Rock. Paper. Scissors</h2>

        {/* wins vs losses stats */}
        <div className='wins-losses'>
          <div className='wins'>
            <span className='number'>{wins}</span>
            <span className='text'>{wins === 1 ? 'Win' : 'Wins'}</span>
          </div>

          <div className='losses'>
            <span className='number'>{loses}</span>
            <span className='text'>{loses === 1 ? 'Lose' : 'Losses'}</span>
          </div>
        </div>
      </div>

      {/* the popup to show win/lose/draw */}
      {gameState && (
        <div
          className={`game-state ${gameState}`}
          onClick={() => restartGame()}
        >
          <div>
            <div className='game-state-content'>
              <p>{renderComponent(userChoice)}</p>
              <p>you {gameState}</p>
              <p>{renderComponent(computerChoice)}</p>
            </div>
            <button onClick={() => restartGame()}>Play again</button>
          </div>
        </div>
      )}

      <div className='choices'>
        {/* choices captions */}
        <div>You</div>
        <div />
        <div>Computer</div>

        {/* buttons for my choice */}
        <div>
          <button className='rock' onClick={() => handleUserChoice(1)}>
            <Rock />
          </button>
          <button className='paper' onClick={() => handleUserChoice(2)}>
            <Paper />
          </button>
          <button className='scissors' onClick={() => handleUserChoice(3)}>
            <Scissors />
          </button>
        </div>

        <div className='vs'>vs</div>

        {/* show the computer's choice */}
        <div>
          <button className='computer-choice'>?</button>
        </div>
      </div>
    </div>
  );
}
