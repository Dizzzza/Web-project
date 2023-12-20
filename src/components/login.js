import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/reg.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });

      if (response && response.data) {
        console.log(response.data.message);
      } else {
        console.error('Empty response received');
      }
    } catch (error) {
      console.error('Login failed:', error.response.data.error);
    }
  };

  return (
    <div className="login-form-container">
      <h2>Login Form</h2>
      <label>Username: </label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br />

      <label>Password: </label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />

      <Link to="/" style={{ margin: '3vh auto' }}>
        <button className='regBtn' onClick={handleLogin}>Login</button>
      </Link>
    </div>
  );
};

export default LoginForm;
