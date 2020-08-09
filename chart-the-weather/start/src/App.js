import React, { useState } from 'react';
import './App.css';
import { GeoForm } from './components/GeoForm';
import { WeatherChart } from './components/WeatherChart';


export default function App() {
  const [latLng, setLatLng] = useState(null);

  return (
    <div className='app'>
      <GeoForm setLatLng={setLatLng} />
      {latLng && <WeatherChart latLng={latLng} />}
    </div>
  );
}
