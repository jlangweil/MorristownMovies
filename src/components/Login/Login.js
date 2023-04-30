// src/Login.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Login.css';
import OAuthLogin from './OAuthLogin';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const apiUrl = process.env.REACT_APP_API_URL;

const Login = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const { currentUser, userEmail } = useAuth();

  const navigate = useNavigate();

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


  const handleSubmit = async (event) => {
    event.preventDefault();
    // Perform authentication here
    try {
      const requestUrl = `${apiUrl}/users?email=${email}`;

      const response = await axios.get(requestUrl, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      });

  
      if (response.data && Object.keys(response.data).length > 0) {
        const user = response.data;
  
        // Compare the password hashes
        const passwordMatches = bcrypt.compareSync(password, user.password);
  
        if (passwordMatches) {
          // Set the logged in user details
          login(user);
          setTimeout(() => {
            window.scroll(0, 0);
          }, 100);
          
          // Redirect the user to the desired page after successful login
          navigate('/');
          
         
          //setLoggedInUser(user);
  
          // Handle success, e.g., navigate to the next page, display a success message, etc.
        } else {
          // Handle error, e.g., display an error message
          setErrorMessage('E-mail or password is incorrect.');
        }
      } else {
        // Handle error, e.g., display an error message
        setErrorMessage('E-mail or password is incorrect.');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data); // Update the error message with the server response
      } else {
        setErrorMessage('E-mail or password is incorrect.');
      }
     
    }
  };

  return (
    <div className="login-section">
      <div className="login-box">
        <h3>Welcome!</h3>
        <div style={{ minHeight: '1.5em' }}>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </div>
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
         <br/>
         <center>Don't have an account?</center>
         <center><Link to="/signup" as={Button} style={{marginTop: "10px"}}>Sign Up</Link></center>
        {/*  <text align="right">Forgot Password?</text> */}
      </form>
      </div>
      {/* <center>or</center>
      <br />
      <OAuthLogin
            onGoogleSuccess={handleGoogleSuccess}
            onGoogleFailure={handleGoogleFailure}
          /> */}
      </div>
          
    
)}

export default Login;
