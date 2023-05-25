// src/Login.js
import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import './Login.css';
//import OAuthLogin from './OAuthLogin';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const apiUrl = process.env.REACT_APP_API_URL;

const Login = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

 
  const navigate = useNavigate();

  /* const handleGoogleSuccess = (response) => {
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
 */

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
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
          setIsLoading(false);
          // Redirect the user to the desired page after successful login
          navigate('/');
          
         
          //setLoggedInUser(user);
  
          // Handle success, e.g., navigate to the next page, display a success message, etc.
        } else {
          setIsLoading(false);
          // Handle error, e.g., display an error message
          setErrorMessage('E-mail or password is incorrect.');
        }
      } else {
        setIsLoading(false);
        // Handle error, e.g., display an error message
        setErrorMessage('E-mail or password is incorrect.');
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data); // Update the error message with the server response
      } else {
        setErrorMessage('E-mail or password is incorrect.');
      }
     
    }
  };

  const handleSubmit2 = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const requestUrl = `${apiUrl}/users`;
      const response = await axios.post(
        requestUrl, 
        { email, password },
        { headers: { 'x-authenticate': true, Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` } },
      );
  
      if (response.data && response.data.user) {
        // Set the logged in user details
        login(response.data.user);
        setTimeout(() => {
          window.scroll(0, 0);
        }, 100);
        setIsLoading(false);
        // Redirect the user to the desired page after successful login
        navigate('/');
      } else {
        setIsLoading(false);
        // Handle error, e.g., display an error message
        setErrorMessage('E-mail or password is incorrect.');
      }
    } catch (error) {
      setIsLoading(false);
        setErrorMessage('E-mail or password is incorrect.');
    }
  };
  

  return (
    <div className="login-section">
      <div className="login-box">
        <h3>Welcome!</h3>
        <div style={{ minHeight: '1.5em' }}>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </div>
        <form onSubmit={handleSubmit2}>

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
        <Button
          variant="secondary"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            'Login'
          )}
        </Button>
         <div style={{textAlign: "right"}}><Link to="/forgot">Forgot password?</Link></div>
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
