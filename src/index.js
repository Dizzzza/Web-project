import React, { useState, useEffect } from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import Weather from './components/weather';
import NavScrollExample from './components/header';
import CityTable from './components/citytable';
import SearchResultPage from './components/searchresult';
import Footer from './components/footer';
import WeatherMap from './components/weathermap';
import HealthTravel from './components/healthevents';
import axios from 'axios';
import HourlyPage from './components/hourly';
import CrudApp from './components/crudapp';
import RegistrationForm from './components/registration';
import LoginForm from './components/login';

const withWeatherData = (WrappedComponent) => {
  return (props) => {
    const [weatherData, setWeatherData] = useState(null);
    const apiKey = '58e6a479136e596b6ffc163d05e0faaa';

    useEffect(() => {
      const getWeather = async (city, country) => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`
          );
          setWeatherData(response.data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      };

      if (props.city && props.country) {
        getWeather(props.city, props.country);
      }
    }, [props.city, props.country, apiKey]);

    return <WrappedComponent {...props} weatherData={weatherData} />;
  };
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }
  

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}


const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/search/:searchTerm" element={
          <ErrorBoundary>
            <div>
              <SearchResultPage />
              <Footer />
            </div>
          </ErrorBoundary>
        } />
        <Route path="/login" element={
          <div>
            <NavScrollExample />
            <LoginForm />
          </div>
        } />
        <Route path="/playground" element={
          <div>
            <NavScrollExample />
            <CrudApp />
            <Footer />
          </div>
        } />
        <Route path="/reg" element={
          <div>
            <NavScrollExample />
            <RegistrationForm />
          </div>
        } />
        <Route path="/hourly/:searchTerm" element={
          <div>
            <HourlyPage />
            <Footer />
          </div>
        } />
        <Route path="/healthtravel/:term" element={
          <div>
            <NavScrollExample />
            <HealthTravel />
            <Footer />
          </div>
        } />
        <Route path="/" element={
        <div>
          <NavScrollExample />
          <CityTable />
          <WeatherMap />
          <Footer />
        </div>} />
      </Routes>
    </Router>
  </React.StrictMode>
);