import { useState, useEffect } from 'react';

export const useMovement = () => {
  const [direction, setDirection] = useState('down');
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  //add eventListener to windows to listen for arrow keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') move('up');
      if (e.key === 'ArrowLeft') move('left');
      if (e.key === 'ArrowDown') move('down');
      if (e.key === 'ArrowRight') move('right');
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const move = (dir) => {
    setDirection(dir);
    if (dir === 'up') setY((Y) => Y - 20);

    if (dir === 'left') setX((x) => x - 20);

    if (dir === 'down') setY((Y) => Y + 20);

    if (dir === 'right') setX((x) => x + 20);
  };

  return { x, y, direction, move };
};
