import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavScrollExample from './header';
import { useParams } from 'react-router-dom';
import WeatherCard from './weathercard';
import WeatherMap from './weathermap';
import Health from './health';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

function TabsExample() {
const { searchTerm } = useParams();
const city = useState(searchTerm);

return (
  <Nav variant="tabs" defaultActiveKey={`/search/${city}`} style={{ justifyContent: 'center' }}>
      <Nav.Item>
        <Nav.Link href={`/search/${city[0]}`}>Today</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href='#'>3 hourly</Nav.Link>
      </Nav.Item>
    </Nav>
);
}

const HourlyPage = () => {
  const { searchTerm } = useParams();
  const [city, setCity] = useState(searchTerm);
  const country = 'kz';
  const [weatherData, setWeatherData] = useState(null);
  const [weatherObject, setWeatherObject] = useState(null);
  const [weatherResponse, setWeatherResponse] = useState(null);
  const [mappedWeather, setMappedWeather] = useState([]);

  const apiKey = '58e6a479136e596b6ffc163d05e0faaa';

  useEffect(() => {
    const getWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`
        );
        setWeatherData(response.data);

        const hourResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${apiKey}&units=metric`
        );


        const responseAir = await axios.get(
            `http://api.openweathermap.org/data/2.5/air_pollution?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${apiKey}`
          );

          setWeatherResponse(hourResponse.data.list);

        console.log(weatherObject)
      } catch (error) {
        console.error('Ошибка при получении данных о погоде:', error);
      }
    };


    if (city) {
      getWeather();
    }
  }, [city, country, apiKey]);

  useEffect(() => {
    if (weatherResponse) {
       const responseWeather = weatherResponse.map((weatherItem) => {
         return {
           description: weatherItem.weather[0].main,
           temp: weatherItem.main.temp,
           speed: weatherItem.wind.speed,
         };
       });
       setMappedWeather(responseWeather);
    }
   }, [weatherResponse]);


  return (
    <div>
    <NavScrollExample />
    <TabsExample />
    <h1 style={{ margin: '5vh auto', display: 'table' }}>Weather in {city}</h1>


    {mappedWeather && mappedWeather.map((weatherItem, index) => (
      <WeatherCard key={index} currentWeather={weatherItem} />
    ))}

    <WeatherMap />
  </div>
  );
};

export default HourlyPage;
