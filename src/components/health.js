import React, { useState, useEffect } from 'react';
import '../index.css';
import { Link } from 'react-router-dom';

const Health = ({ temperature, condition, description, city }) => {
  const [health, setHealth] = useState([
    { name: 'Arthritis', status: 'Good' },
    { name: 'Cold', status: 'Good' },
    { name: 'Flu', status: 'Good' },
    { name: 'Headache', status: 'Good' },
    { name: 'Asthma', status: 'Good' }
  ]);

  useEffect(() => {
    let newStatus;

    setHealth((prevHealth) => {
      return prevHealth.map((item) => {
        newStatus = determineStatusForHealth(item.name, temperature, condition, description);
        return { ...item, status: newStatus };
      });
    });

  }, [temperature, condition, description]);

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

  return (
    <div style={{ margin: '2vh auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ fontSize: '150%', fontWeight: 'bold' }}>Health</div>
        <div style={{ background: 'gray', padding: '10px', borderRadius: '10px', marginBottom: '10px', width: '50%', display: 'flex', justifyContent: 'space-between' }}>
            {health.map((item, index) => (
            <div key={index} style={{ background: 'white', borderRadius: '10px', padding: '10px', marginBottom: '10px', width: '7vw' }}>
                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{item.name}</div>
                <div style={{ color: item.status === 'Low' || item.status === 'Good' ? 'green' : 'red' }}>
                {item.status}
                </div>
            </div>
            ))}
        </div>
        <Link to={`/healthtravel/${city}`}>
            <button style={{ background: 'white', borderRadius: '10px', padding: '10px', border: 'none', cursor: 'pointer' }}>View More</button>
        </Link>
    </div>

  );
};

export default Health;
