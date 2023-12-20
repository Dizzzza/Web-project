import React from 'react';

const CityList = ({ cities, deleteCity }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h2>City List</h2>
    <ul>
      {cities.map((city, index) => (
        <li key={index}>
          City: {city.city} - Weather: {city.weather}
          <button onClick={() => deleteCity(index)}>Delete</button>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default CityList;
