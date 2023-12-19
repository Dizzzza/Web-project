import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const WeatherMap = () => {
 const mapRef = useRef(null);

 useEffect(() => {
    if (mapRef.current) {
      const map = L.map(mapRef.current).setView([43, 76], 2);
      const tempLayer = L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=58e6a479136e596b6ffc163d05e0faaa`, {
        maxZoom: 3,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors</a>'
      }).addTo(map);

      return () => {
        map.remove();
      };
    }
 }, []);

 return (
    <div>
      <div ref={mapRef} style={{ width: '800px', height: '400px', margin: '0 auto' }}></div>

    </div>
 );  
  
};

export default WeatherMap;