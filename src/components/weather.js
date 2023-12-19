import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = '58e6a479136e596b6ffc163d05e0faaa';

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <label htmlFor="cityInput">Enter City:</label>
      <input
        type="text"
        id="cityInput"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <label htmlFor="countryInput">Enter Country:</label>
      <input
        type="text"
        id="countryInput"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>

      {weatherData && (
        <div>
          <h2>Weather in {weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
