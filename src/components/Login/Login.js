// src/Login.js
import React, { useState } from 'react';
import './Login.css';
import OAuthLogin from './OAuthLogin';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleGoogleSuccess = (response) => {
    const profile = response.getBasicProfile();
    const userData = {
      id: profile.getId(),
      name: profile.getName(),
      email: profile.getEmail(),
      imageUrl: profile.getImageUrl(),
      accessToken: response.getAuthResponse().id_token,
    };
    setUser(userData);
  };

  const handleGoogleFailure = (error) => {
    console.error('Google Login Error:', error);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform authentication here
  };

  return (
    <div className="login-section">
      <div className="login-box">
        <h3>Welcome!</h3>
        <form onSubmit={handleSubmit}>

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

         <button type="submit">Login</button>
         <text align="right">Forgot Password?</text>
      </form>
      </div>
      <center>or</center>
      <br />
      <OAuthLogin
            onGoogleSuccess={handleGoogleSuccess}
            onGoogleFailure={handleGoogleFailure}
          />
      </div>
          
    
)}

export default Login;
