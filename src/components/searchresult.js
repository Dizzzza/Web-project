  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import NavScrollExample from './header';
  import { useParams } from 'react-router-dom';
  import WeatherCard from './weathercard';
  import WeatherMap from './weathermap';
  import Health from './health';
  import Nav from 'react-bootstrap/Nav';

function TabsExample() {
  const { searchTerm } = useParams();
  const city = useState(searchTerm);
  console.log(city);

  return (
    <Nav variant="tabs" defaultActiveKey={`/search/${city}`} style={{ justifyContent: 'center' }}>
      <Nav.Item>
        <Nav.Link href="#">Today</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href={`/hourly/${city[0]}`}>3 hourly</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

  const SearchResultPage = () => {
    const { searchTerm } = useParams();
    const [city, setCity] = useState(searchTerm);
    const country = 'kz';
    const [weatherData, setWeatherData] = useState(null);
    const [weatherObject, setWeatherObject] = useState({
      description: '',
      temp: 0,
      condition: 'Хорошее',
      speed: 5,
      gust: 10,
    });

    const apiKey = '58e6a479136e596b6ffc163d05e0faaa';

    useEffect(() => {
      const getWeather = async () => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`
          );
          setWeatherData(response.data);

          const responseAir = await axios.get(
              `http://api.openweathermap.org/data/2.5/air_pollution?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${apiKey}`
            );

          setWeatherObject({
            description: response.data.weather[0].main,
            temp: response.data.main.temp,
            condition: responseAir.data.list[0].main.aqi.toString(),
            speed: response.data.wind.speed,
          });
        } catch (error) {
          console.error('Ошибка при получении данных о погоде:', error);
        }
      };

      
      if (city) {
        getWeather();
      }
    }, [city, country, apiKey]);

    console.log(weatherData);

    return (
      <div>
      <NavScrollExample />
      <TabsExample />
      <hr></hr>
      <br></br>
      <h1 style={{ margin: '5vh auto', display: 'table' }}>Weather in {city}</h1>


      {weatherObject && (
        <>
          <WeatherCard currentWeather={weatherObject} />
          <Health
            temperature={parseFloat(weatherObject.temp)}
            condition={weatherObject.condition.toString()}
            description={String(weatherObject.description)}
            city={String(city)}
          />
        </>
      )}

      <WeatherMap />
    </div>
    );
  };

  export default SearchResultPage;
