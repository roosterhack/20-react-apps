import React, { useState, useReducer } from 'react';
import Tabs from './components/Tabs';
import AddressBar from './components/AddressBar';
import './App.css';


const reducer = (state, action) => {
  if (action.type === 'ADD') {
    const browsers = [...state.browsers, '']
    const activeBrowser = browsers.length - 1

    return {
      browsers,
      activeBrowser
    }
  }
  if (action.type === 'CHOOSE') {
    return {
      ...state,
      activeBrowser: action.payload
    }
  }
  if (action.type === 'UPDATE') {
    const browsers = [...state.browsers];
    browsers[state.activeBrowser] = action.payload;

    return {
      ...state,
      browsers
    }
  }
  if (action.type === 'CLOSE') {

  }
}


export default function App() {

  const [state, dispatch] = useReducer(reducer, {
    browsers: [
      'http://eddiechungdesign.com',
      'https://learn.chrisoncode.io',
    ],
    activeBrowser: 0
  })


  const chooseBrowser = (id) => {
    dispatch({ type: 'CHOOSE', payload: id })
  };

  const addBrowser = () => {
    dispatch({ type: 'ADD' })
  };

  const updateBrowser = (url) => {
    dispatch({ type: 'UPDATE', payload: url })
  };

  const { browsers, activeBrowser } = state;
  const url = browsers[activeBrowser];



  return (
    <div className='app'>
      <div className='browser'>
        <Tabs
          browsers={browsers}
          active={activeBrowser}
          choose={chooseBrowser}
          add={addBrowser}
        />

        <AddressBar update={updateBrowser} url={url} />

        <div className='viewport'>
          {url ? (
            <iframe src={url} frameborder='0' title='Stuff'></iframe>
          ) : (
              <>New Tab Page</>
            )}
        </div>
      </div>
    </div>
  );
}
