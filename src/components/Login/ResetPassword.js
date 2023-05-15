import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ResetPassword.css';

const ResetPassword = () => {
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();
  const token = new URLSearchParams(location.search).get('token');  
  const email = new URLSearchParams(location.search).get('email');  

  useEffect(() => {
    const verifyToken = async () => {
      if (!token || !email) {
            setError('Invalid link.');  //give option to send link again
            return;
      }  
      try {
        const response = await axios.put(
            `${process.env.REACT_APP_API_URL}/users`,
            {
              email: email,
              token: token
            },
            {
              headers: {
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
              },
            }
          );
          

        if (response.status === 200) {
          setIsTokenValid(true);
        } else {
          setError('Invalid token');
        }
      } catch (error) {
        setError('Invalid token');
      }
    };

    verifyToken();
  }, [email, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/users`, 
        { email, password },
        {
          headers: {
            'x-reset-password': 'true',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccess(true);
      } else {
        setError('Error resetting password');
      }
    } catch (err) {
      setError('Error resetting password');
    }
  };

  if (success) {
    return (
      <div className="reset-password-success">
        <center>Password reset successfully. Please <a href="/login">click here</a> to log in.</center>
      </div>
    );
  }

  return (
    <div className="reset-password-section">
      {isTokenValid ? (
        <div className="reset-password-box">
          <h3>Reset Password</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="password">New Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button type="submit">Reset Password</button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      ) : (
        <div className="reset-password-error">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
