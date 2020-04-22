import React, { useRef, useState } from 'react';
import './App.css';

const padTime = (time) => {
  return time.toString().padStart(2, '0');
};

export default function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [title, setTitle] = useState('Let the count down begin!!!');
  const [isRunning, setIsRunning] = useState(false);

  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);

  const intervalRef = useRef(null);

  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle('Ready to go again?');
    setTimeLeft(25 * 60);
  };

  const startTimer = () => {
    setIsRunning(true);
    if (intervalRef.current !== null) return;

    intervalRef.current = setInterval(() => {
      setTitle('You are doing great!');
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) return timeLeft - 1;

        resetTimer();
        return 0;
      });
    }, 1000);
  };

  const stopTimer = () => {
    setIsRunning(false);
    if (intervalRef.current === null) return;
    clearInterval(intervalRef.current);
    setTitle('Keep it up!');
  };

  return (
    <div className='app'>
      <h2>{title}</h2>

      <div className='timer'>
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className='buttons'>
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}
