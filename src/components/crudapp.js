// CrudApp.js
import React, { useState } from 'react';
import CityForm from './cityform';
import CityList from './citylist';

const CrudApp = () => {
  const [cities, setCities] = useState([]);

  const addCity = (newCity) => {
    setCities([...cities, newCity]);
  };

  const deleteCity = (index) => {
    const newCities = [...cities];
    newCities.splice(index, 1);
    setCities(newCities);
  };

  return (
    <div>
      <CityForm addCity={addCity} />
      <CityList cities={cities} deleteCity={deleteCity} />
    </div>
  );
};

export default CrudApp;
