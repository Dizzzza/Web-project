import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './css/weatherCard.css';
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

const WeatherCard = ({ currentWeather }) => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const { description, temp, condition, speed } = currentWeather;

  const getWeatherIcon = () => {
    switch (description) {
        case 'Mist':
            return mist;
        case 'Clouds':
            return clouds;
        case 'overcast clouds':
            return clouds;
        case "broken clouds":
            return clouds;
        case 'Rain':
            return rain;
        case 'Drizzle':
            return drizzle;
        case 'Thunderstorm':
            return thunderstorm;
        case 'Snow':
            return snow;
        case 'Clear':
            return clear;
        case 'Smoke':
            return smoke;
        case 'Haze':
            return haze;
        case 'Dust':
            return dust;
        case 'Fog':
            return fog;
        case 'Sand':
            return sand;
        case 'Ash':
            return ash;
        case 'Squall':
            return squall;
        case 'Tornado':
            return tornado;
    }
  };

  const getAirCondition = () => {
    switch (String(condition)) {
        case '1':
            return 'good';
        case '2':
            return 'fair';
        case '3':
            return 'moderate';
        case '4':
            return 'poor';
        case '5':
            return 'Very poor';
    }
  };

  const airCondition = getAirCondition();

  const weatherIcon = getWeatherIcon();

  if (condition == 0) {
    return (
      <div className="weather-card">
        <div className="top-left">
          <p className="weather-label">Current Weather</p>
          <p className="time-label">{currentTime}</p>
        </div>
        <div className="center-left">
          <p className="weather-label">Temperature</p>
          <p className="temp">{temp} °C</p>
          <img src={weatherIcon} alt={description} className="weather-icon" />
        </div>
        <div className="right">
          <div className="air-quality">
            <p className="label">Air Condition</p>
            <p>{airCondition}</p>
          </div>
          <div className="wind">
            <p className="label">Wind</p>
            <p>{speed} м/с</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="weather-card">
        <div className="top-left">
          <p className="weather-label">Current Weather</p>
          <p className="time-label">{currentTime}</p>
        </div>
        <div className="center-left">
          <p className="weather-label">Temperature</p>
          <p className="temp">{temp} °C</p>
          <img src={weatherIcon} alt={description} className="weather-icon" />
        </div>
        <div className="right">
          <div className="wind">
            <p className="label">Wind</p>
            <p>{speed} м/с</p>
          </div>
        </div>
      </div>
    );
  };
  }

WeatherCard.propTypes = {
  currentWeather: PropTypes.shape({
    description: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    condition: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired,
  }).isRequired,
};

export default WeatherCard;
