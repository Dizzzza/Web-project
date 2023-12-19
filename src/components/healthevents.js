import React, { useState, useEffect } from 'react';
import '../index.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const HealthTravel = () => {
    const { term } = useParams();
    const [city, setCity] = useState(term);
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
            description: response.data.weather[0].description,
            temp: response.data.main.temp,
            condition: responseAir.data.list[0].main.aqi.toString(),
            speed: response.data.wind.speed,
            gust: 10,
          });
        } catch (error) {
          console.error('Ошибка при получении данных о погоде:', error);
        }
      };

      if (city) {
        getWeather();
      }
    }, [city, country, apiKey]);
    
  const [health, setHealth] = useState([
    { name: 'Arthritis', status: 'Good' },
    { name: 'Cold', status: 'Good' },
    { name: 'Flu', status: 'Good' },
    { name: 'Headache', status: 'Good' },
    { name: 'Asthma', status: 'Good' }
  ]);

  const [events, setEvents] = useState([
    { name: 'Fishing', status: 'Good' },
    { name: 'Run', status: 'Good' },
    { name: 'Golf', status: 'Good' },
    { name: 'Bike', status: 'Good' },
    { name: 'Bathing', status: 'Good' },
    { name: 'Astronomy', status: 'Good' },
    { name: 'Hike', status: 'Good' }
  ]);

  const [travels, setTravels] = useState([
    { name: 'AviaTravel', status: 'Good' },
    { name: 'Riding', status: 'Good' }
  ]);

  const [insects, setInsects] = useState([
    { name: 'mosquitoes', status: 'Good' },
    { name: 'harmful insects inside home', status: 'Good' },
    { name: 'harmful insects outside home', status: 'Good' }
  ]);

  useEffect(() => {
    let newStatus;

    setHealth((prevHealth) => {
      return prevHealth.map((item) => {
        newStatus = determineStatusForHealth(item.name, weatherObject.temp, weatherObject.condition, weatherObject.description);
        return { ...item, status: newStatus };
      });
    });

    setEvents((prevEvent) => {
        return prevEvent.map((item) => {
            newStatus = determineStatusForEvent(item.name, weatherObject.temp, weatherObject.condition, weatherObject.description);
            return { ...item, status: newStatus };
        })
    })

    setTravels((prevTravels) => {
        return prevTravels.map((item) => {
            newStatus = determineStatusForTravels(item.name, weatherObject.temp, weatherObject.condition, weatherObject.description);
            return { ...item, status: newStatus };
        })
    })

    setInsects((prevInsects) => {
        return prevInsects.map((item) => {
            newStatus = determineStatusForInsects(item.name, weatherObject.temp, weatherObject.condition, weatherObject.description);
            return { ...item, status: newStatus };
        })
    })

  }, [weatherObject.temp, weatherObject.condition, weatherObject.description]);

  const determineStatusForHealth = (itemName, temp, condition, description) => {
    if (temp < 5 && (itemName == 'Arthritis' || itemName == 'Cold' || itemName == 'Flu')) {
      return 'High';
    } else if (itemName == 'Arthritis' || itemName == 'Cold' || itemName == 'Flu') {
      return 'Low';
    }

    if ((description == 'smoke' || condition >= 3) && (itemName == 'Headache' || itemName == 'Asthma')) {
        return 'High';
      } else if (itemName == 'Headache' || itemName == 'Asthma') {
        return 'Low';
      }
  };

  const determineStatusForEvent = (itemName, temp, condition, description) => {
    if((itemName == 'Astronomy') && (description == 'Smoke' || description == 'Clouds' || description == 'overcast clouds')) {
        return 'Bad';
    } else if ((itemName == 'Astronomy')) {
        return 'Good';
    }
    if((itemName == 'Fishing' || itemName == 'Bathing' || itemName == 'Hike' || itemName == 'Run' || itemName == 'Golf') && ((temp < 5) || (description == 'Tornado' || description == 'Thunderstorm' || description == 'Squall'|| description == 'Snow'))) {
        return 'Bad';
    } else if ((itemName == 'Fishing' || itemName == 'Bathing' || itemName == 'Hike' || itemName == 'Run' || itemName == 'Golf')) {
        return 'Good';
    }

    if (itemName == 'Bike' && ((temp < 0) || (description == 'Tornado' || description == 'Thunderstorm' || description == 'Squall' || description == 'Snow' || description == 'Fog' || description == 'Sand' || description == 'Ash' || description == 'Rain'))) {
        return 'Bad';
    } else if (itemName == 'Bike') {
        return 'Good';
    }
  };

  const determineStatusForTravels = (itemName, temp, condition, description) => {
    if (itemName == 'AviaTravel' && (description == 'Tornado' || description == 'Thunderstorm' || description == 'Squall')) {
      return 'Bad';
    } else if (itemName == 'AviaTravel') {
      return 'Good';
    }

    if (itemName == 'Riding' && (description == 'Tornado' || description == 'Thunderstorm' || description == 'Squall' || description == 'Snow' || description == 'Fog' || description == 'Sand' || description == 'Ash' || description == 'Rain')) {
        return 'Bad';
      } else if (itemName == 'Riding') {
        return 'Good';
      }
  };

  const determineStatusForInsects = (itemName, temp, condition, description) => {
    if (itemName == 'AviaTravel' && (description == 'tornado' || description == 'thunderstorm' || description == 'squall')) {
      return 'Bad';
    } else if (itemName == 'AviaTravel') {
      return 'Good';
    }

    if (itemName == 'mosquitoes') {
        return 'High';
    }
    
    if (itemName == 'harmful insects inside home' && temp < 5) {
        return 'High';
      } else if (itemName == 'harmful insects inside home') {
        return 'Low'
      }

      if (itemName == 'harmful insects outside home' && temp < 5) {
        return 'Low';
      } else if (itemName == 'harmful insects outside home') {
        return 'High';
      }
  };

  const renderList = (list, name) => {
    switch(name) {
        case 'health':
            return (
                <div style={{ margin: '2vh auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{fontSize: '150%', fontWeight: 'bold'}}>Health</div>
                    <div style={{ background: 'gray', padding: '10px', borderRadius: '10px', marginBottom: '10px', width: '50%', display: 'flex', justifyContent: 'space-between' }}>
                        {list.map((item, index) => (
                            <div key={index} style={{ background: 'white', borderRadius: '10px', padding: '10px', marginBottom: '10px', width: '7vw' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{item.name}</div>
                            <div style={{ color: item.status === 'Low' || item.status === 'Good' ? 'green' : 'red' }}>
                                {item.status}
                            </div>
                            </div>
                        ))}
                    </div>
                </div>
              );
        case 'events':
            return (
                <div style={{ margin: '2vh auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{fontSize: '150%', fontWeight: 'bold'}}>Events</div>
                    <div style={{ background: 'gray', padding: '10px', borderRadius: '10px', marginBottom: '10px', width: '50%', display: 'flex', justifyContent: 'space-between' }}>
                        {list.map((item, index) => (
                            <div key={index} style={{ background: 'white', borderRadius: '10px', padding: '10px', marginBottom: '10px', width: '6.5vw' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{item.name}</div>
                            <div style={{ color: item.status === 'Low' || item.status === 'Good' ? 'green' : 'red' }}>
                                {item.status}
                            </div>
                            </div>
                        ))}
                    </div>
                </div>
              );
        case 'travels':
            return (
                <div style={{ margin: '2vh auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{fontSize: '150%', fontWeight: 'bold'}}>Travelss</div>
                    <div style={{ background: 'gray', padding: '10px', borderRadius: '10px', marginBottom: '10px', width: '50%', display: 'flex', justifyContent: 'space-between' }}>
                        {list.map((item, index) => (
                            <div key={index} style={{ background: 'white', borderRadius: '10px', padding: '10px', marginBottom: '10px', width: '20vw' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{item.name}</div>
                            <div style={{ color: item.status === 'Low' || item.status === 'Good' ? 'green' : 'red' }}>
                                {item.status}
                            </div>
                            </div>
                        ))}
                    </div>
                </div>
              );
        case 'insects':
            return (
                <div style={{ margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{fontSize: '150%', fontWeight: 'bold'}}>Insects</div>
                    <div style={{ background: 'gray', padding: '10px', borderRadius: '10px', marginBottom: '10px', width: '50%', display: 'flex', justifyContent: 'space-between' }}>
                        {list.map((item, index) => (
                            <div key={index} style={{ background: 'white', borderRadius: '10px', padding: '10px', marginBottom: '10px', width: '14vw' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{item.name}</div>
                            <div style={{ color: item.status === 'Low' || item.status === 'Good' ? 'green' : 'red' }}>
                                {item.status}
                            </div>
                            </div>
                        ))}
                    </div>
                </div>
              );
    }
    
  };

  return (
    <div>
      {renderList(health, 'health')}
      {renderList(events, 'events')}
      {renderList(travels, 'travels')}
      {renderList(insects, 'insects')}
    </div>
  );
};

export default HealthTravel;
