import React, { useState } from 'react';
import './App.css';
import { GeoForm } from './components/GeoForm';
import { Bar, defaults } from 'react-chartjs-2';

// openweathermap.org
// https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,minutely&units=imperial&appid=yourapikey
// api key:

defaults.global.legend.display = false;

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

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const labels = [...Array(7)].map((_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i);
  return days[date.getDay()];
});

const WeatherChart = () => {
  return (
    <Bar
      options={{
        tooltips: { mode: 'index', interset: false },
        scales: {
          xAxes: [
            {
              gridLines: false,
              ticks: { fontColor: '#F680BC', fontSize: 10, padding: 20 },
            },
          ],
          yAxes: [
            {
              gridLines: false,
              ticks: { fontColor: '#F680BC', fontSize: 10, padding: 20 },
            },
          ],
        },
      }}
      data={{
        labels,
        datasets: [
          {
            label: 'Hoghs',
            backgroundColor: '#EC9CAD',
            data: [140, 200, 300],
          },
          {
            label: 'Hoghs',
            backgroundColor: '#EC9CAD',
            data: [40, 200, 300],
          },
        ],
      }}
    />
  );
};
