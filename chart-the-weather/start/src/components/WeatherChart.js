import React, { useState, useEffect } from 'react';
import { Bar, defaults } from 'react-chartjs-2';


defaults.global.legend.display = false;

const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?exclude=hourly,minutely&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API}`


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

const options = {
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
}



export const WeatherChart = ({ latLng }) => {

    const [datasets, setDatasets] = useState([]);

    useEffect(() => {
        const formatWeatherData = (data) => {
            return [
                {
                    label: 'Hights',
                    backgroundColor: '#EC9CAC',
                    borderColor: '#EC9CAC',
                    data: data.daily.map(day => day.temp.max)
                },
                {
                    label: 'Lows',
                    backgroundColor: '#9CCAF6',
                    borderColor: '#9CCAF6',
                    data: data.daily.map(day => day.temp.min)
                },
            ]
        }


        const getWeatherData = async () => {
            console.log(latLng)
            if (latLng) {
                const res = await fetch(`${apiUrl}&lat=${latLng.lat}&lon=${latLng.lng}`)
                const data = await res.json();
                console.log(data)
                const formattedData = formatWeatherData(data)
                setDatasets(formattedData)
            }
        }

        getWeatherData()

        console.log(latLng)


    }, [latLng])



    return (
        <div className="chart">
            <Bar
                options={options}
                data={{ labels, datasets }}
            />
        </div>
    );
};
