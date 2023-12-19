import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';
import mist from './img/mist.png';
import ash from './img/ash.png';
import clouds from './img/clouds.png';
import clear from './img/clear.png';
import drizzle from './img/drizzle.png';
import dust from './img/dust.png';
import haze from './img/haze.png';
import fog from './img/fog.png';
import sand from './img/sand.png';
import rain from './img/rain.png';
import snow from './img/snow.png';
import smoke from './img/smoke.png';
import tornado from './img/tornado.png';
import thunderstorm from './img/thunderstorm.png';
import squall from './img/squall.png';

import { Link } from 'react-router-dom';

const CityTable = () => {
  const [data, setData] = useState([
    { city1: 'Aktau', city2: 'Aktobe' },
    { city1: 'Almaty', city2: 'Nur-Sultan' },
    { city1: 'Atyrau', city2: 'Karaganda' },
    { city1: 'Kokshetau', city2: 'Kostanay' },
    { city1: 'Pavlodar', city2: 'Petropavlovsk' },
    { city1: 'Kostanay', city2: 'Kyzylorda' },
    { city1: 'Semey', city2: 'Uralsk' },
    { city1: 'Taldykorgan', city2: 'Taraz' },
    { city1: 'Uralsk', city2: 'Ust-Kamenogorsk' },
  ]);

  const apiKey = '58e6a479136e596b6ffc163d05e0faaa';
  const country = 'KZ';

  const [weather, setWeather] = useState({});

  const getWeatherIcon = (description) => {
    switch (description) {
        case 'mist':
            return mist;
        case 'clouds':
            return clouds;
        case 'rain':
            return rain;
        case 'drizzle':
            return drizzle;
        case 'thunderstorm':
            return thunderstorm;
        case 'snow':
            return snow;
        case 'clear':
            return clear;
        case 'smoke':
            return smoke;
        case 'haze':
            return haze;
        case 'dust':
            return dust;
        case 'fog':
            return fog;
        case 'sand':
            return sand;
        case 'ash':
            return ash;
        case 'squall':
            return squall;
        case 'tornado':
            return tornado;
    }
  };

  useEffect(() => {
    data.forEach(async (row) => {
      try {
        const response1 = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${row.city1},${country}&appid=${apiKey}&units=metric`
        );
        setWeather((prevWeather) => ({
          ...prevWeather,
          [row.city1]: response1.data.main,
        }));
        
        const response2 = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${row.city2},${country}&appid=${apiKey}&units=metric`
        );
        setWeather((prevWeather) => ({
          ...prevWeather,
          [row.city2]: response2.data.main,
        }));
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    });
  }, [data, apiKey, country]);

  return (
    <table className="custom-table">
    <tbody>
      {data.map((row, index) => (
        <tr key={index}>
          <td>
            <Link to={`/search/${row.city1}`} style={{ color: 'black', textDecoration: 'none', display: 'flex', justifyContent: 'space-between', width: '100%'}}>
              <div>{row.city1}</div>
              <div>{weather[row.city1] && `${weather[row.city1].temp} °C`}</div>
            </Link>
          </td>
          <td>
            <Link to={`/search/${row.city2}`} style={{ color: 'black', textDecoration: 'none', display: 'flex', justifyContent: 'space-between', width: '100%'}}>
              <div>{row.city2}</div>
              <div>{weather[row.city2] && `${weather[row.city2].temp} °C`}</div>
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  );
};

export default CityTable;
