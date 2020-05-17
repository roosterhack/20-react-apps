import React, { useState, useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';
import './App.css';

export default function App() {
  const [timers, setTimers] = useState([
    { time: 2, text: 'this is my message' },
    { time: 5, text: 'What are you doing?' },
    { time: 8, text: 'Whats up?' },
  ]);

  const { seconds, isRunning, start, reset } = useStopwatch();

  useEffect(() => {
    const foundTimer = timers.find((timer) => timer.time === seconds);

    if (foundTimer) {
      //this is where we will speak the text
    }
  }, [seconds]);

  const updateTimers = (index, time, text) => {
    const newTimers = [...timers];
    newTimers[index].time = time;
    newTimers[index].text = text;

    setTimers(newTimers);
  };

  const addTimer = () => {
    const newTimers = [...timers, { time: 100, text: 'yooooo' }];
    setTimers(newTimers);
  };

  return (
    <div className='app'>
      <h2>Talk the Talk</h2>

      <div className='timers'>
        {/* timers go here */}
        {timers.map((timer, index) => (
          <TimerSlot
            key={index}
            timer={timer}
            index={index}
            updateTimers={updateTimers}
          />
        ))}

        <button className='add-button' onClick={addTimer}>
          Add
        </button>
      </div>

      {/* seconds */}
      <h2>{seconds}</h2>

      {/* buttons */}

      <div className='buttons'>
        {!isRunning && (
          <button className='start-button' onClick={start}>
            Start
          </button>
        )}
        {isRunning && (
          <button className='stop-button' onClick={reset}>
            Stop
          </button>
        )}
      </div>
    </div>
  );
}

const TimerSlot = ({ index, timer, updateTimers }) => {
  const [time, setTime] = useState(timer.time);
  const [text, setText] = useState(timer.text);

  const handleBlur = () => {
    updateTimers(index, time, text);
  };

  return (
    <form className='timer' key={index}>
      <input
        type='number'
        value={time}
        onChange={(e) => setTime(e.target.value)}
        onBlur={handleBlur}
      />
      <input
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
      />
    </form>
  );
};
