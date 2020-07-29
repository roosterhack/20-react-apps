import React, { useState } from 'react';
import Tabs from './components/Tabs';
import AddressBar from './components/AddressBar';
import './App.css';

export default function App() {
  //State
  const [browsers, setBrowsers] = useState([
    'http://eddiechungdesign.com',
    'https://learn.chrisoncode.io',
  ]);

  const [activeBrowser, setActiveBrowser] = useState(0);

  const chooseBrowser = (id) => {
    setActiveBrowser(id);
  };

  const addBrowser = () => {
    const newBrowsers = [...browsers, ''];
    setBrowsers(newBrowsers);
    setActiveBrowser(newBrowsers.length - 1);
  };

  const updateBrowser = (url) => {
    const newBrowsers = [...browsers];
    newBrowsers[activeBrowser] = url;
    setBrowsers(newBrowsers);
  };

  const url = browsers[activeBrowser];

  // Effects

  //Functions here

  //Formatting or grabbing of data

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
