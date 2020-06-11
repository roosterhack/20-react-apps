import useInterval from '@use-it/interval';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './App.css';

const messages = [
  { text: 'How do I get better at React?' },
  { text: 'Just build something!' },
  { text: 'OK! What should I build?' },
  { text: 'Iono. Just Google it?' },
  { text: 'Oh! This course looks cool!' },
  { text: 'Send me the link?!' },
  { text: '20ReactApps.com!' },
];

export default function App() {
  const [messageToShow, setMessageToShow] = useState(0);
  useInterval(() => {
    setMessageToShow((messageToShow) => messageToShow + 1);
  }, 2000);

  return (
    <div className='app'>
      <div className='walkthrough'>
        {messages.map((message, index) => {
          const even = index % 2 === 0;
          if (messageToShow + 1 === index) {
            return <TypingIndicator key={index} even={even} />;
          }

          if (index > messageToShow) return <div key={index} />;
          return <Message message={message} index={index} even={even} />;
        })}
      </div>
    </div>
  );
}

const TypingIndicator = ({ even }) => (
  <div className={`typing ${even ? 'is-right' : 'is-left'}`}>
    <motion.div
      className='dots'
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 0.15 }}
    >
      <div />
      <div />
      <div />
    </motion.div>
  </div>
);

const Message = ({ message, index, even }) => {
  return (
    <motion.div
      key={index}
      className='message'
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className='avatar'>😀</div>
      <div className='text'>{message.text}</div>
      <div className='avatar'>🕺🏻</div>
    </motion.div>
  );
};
