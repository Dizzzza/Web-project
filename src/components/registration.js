import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/reg.css';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('male');
  const [subscribe, setSubscribe] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('usa'); // Added state for the selected country

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        password,
        gender,
        subscribe,
        country: selectedCountry, // Pass the selected country to the server
      });

      if (response && response.data) {
        console.log(response.data.message);
      } else {
        console.error('Empty response received');
      }
    } catch (error) {
      console.error('Registration failed:', error.response.data.error);
    }
  };

  return (
    <div className="registration-form-container">
      <h2>Registration Form</h2>
      <label>Username: </label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br />

      <label>Password: </label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />

      <label>Gender: </label>
      <label style={{display: 'flex', justifyContent: 'space-around'}}>
        <div>
        <input
          type="radio"
          value="male"
          checked={gender === 'male'}
          onChange={() => setGender('male')}
        />
        Male
        </div>
        <div>
        <input
          type="radio"
          value="female"
          checked={gender === 'female'}
          onChange={() => setGender('female')}
        />
        Female
        </div>
      </label>
      
      <br />

      <label>
        <input
          type="checkbox"
          checked={subscribe}
          onChange={() => setSubscribe(!subscribe)}
        />
        Subscribe to newsletter
      </label>
      <br />

      <label>Select Country: </label>
      <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
        <option value="usa">USA</option>
        <option value="canada">Canada</option>
        <option value="uk">UK</option>
      </select>
      <br />

      <Link to="/" style={{margin: '3vh auto'}}>
        <button className='regBtn' onClick={handleRegister}>Register</button>
      </Link>
    </div>
  );
};

export default RegistrationForm;
