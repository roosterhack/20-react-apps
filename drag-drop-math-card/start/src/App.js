import React, { useState } from 'react';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag } from 'react-dnd';
import './App.css';

export default function App() {
  const [num1, setNum1] = useState(1);
  const [num2, setNum2] = useState(3);
  const [operator, setOperator] = useState('*');

  const handleDrop = (spot, item) => {
    if (spot === 'num1') setNum1(item.text);
    if (spot === 'num2') setNum2(item.text);
    if (spot === 'operator') setOperator(item.text);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='app'>
        {/* math card */}
        <div className='math-card'>
          <Spot type='number' text={num1} handleDrop={handleDrop} spot='num1' />
          <Spot type='number' text={num2} handleDrop={handleDrop} spot='num2' />
          <Spot
            type='operator'
            text={operator}
            handleDrop={handleDrop}
            spot='operator'
          />
          <div className='total'>{eval(`${num1}${operator}${num2}`)}</div>
        </div>

        <div>
          <div className='cards numbers'>
            {Array(10)
              .fill(0)
              .map((n, i) => (
                <Card key={i} text={i} type='number' />
              ))}
          </div>

          <div className='cards operators'>
            {['*', '-', '+', '/'].map((o, i) => (
              <Card key={i} text={o} type='operator' />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

const Spot = ({ type, text, handleDrop, spot }) => {
  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: type,
    drop: (item) => {
      handleDrop(spot, item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  let backgroundColor = '#f2f2f2';
  if (canDrop) backgroundColor = '#3db897';
  if (isOver) backgroundColor = '#4bdcb5';

  return (
    <div className='spot' ref={dropRef} style={{ backgroundColor }}>
      {text}
    </div>
  );
};

const Card = ({ text, type }) => {
  const [{ opacity }, dragRef] = useDrag({
    item: { type, text },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <div className='card' ref={dragRef} style={{ opacity }}>
      {text}
    </div>
  );
};
