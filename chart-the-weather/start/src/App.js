import React, { useState } from 'react';
import './App.css';
import { GeoForm } from './components/GeoForm';

// openweathermap.org
// https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,minutely&units=imperial&appid=cef56b6308601e549280f04a34c53e77
// api key: cef56b6308601e549280f04a34c53e77

// google maps api
// api key: AIzaSyDo4tB5ETAJxsAyrcQPvpXR-9ZDzmiZvb0

export default function App() {
  const [latLng, setLatLng] = useState(null);

  return (
    <div className='app'>
      {/* form goes here */}
      <GeoForm setLatLng={setLatLng} />
      {/* chart goes here */}

      <WeatherChart />
    </div>
  );
}

// all things with address + lat+long go into a component

// all things that deal with weather api and formatting / deisplaying weather data go into a component
const WeatherChart = () => {
  return <div>Weather chart</div>;
};
