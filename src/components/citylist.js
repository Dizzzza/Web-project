import React from 'react';

const CityList = ({ cities, deleteCity }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h2>City List</h2>
    <ul>
      {cities.map((city, index) => (
        <li key={index}>
          {city.city} - {city.weather}
          <button onClick={() => deleteCity(index)}>Delete</button>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default CityList;
