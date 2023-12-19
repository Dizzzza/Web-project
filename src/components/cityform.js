import React, { useState } from 'react';

const CityForm = ({ addCity }) => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city && weather) {
      addCity({ city, weather });
      setCity('');
      setWeather('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '5vh 0' }}>
      <h2>Add City</h2>
      <form onSubmit={handleSubmit}>
        <label>
          City:
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </label>
        <br />
        <label>
          Weather:
          <input type="text" value={weather} onChange={(e) => setWeather(e.target.value)} />
        </label>
        <br />
        <button type="submit">Add City</button>
      </form>
    </div>
  );
};

export default CityForm;
