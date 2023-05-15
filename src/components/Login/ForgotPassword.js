import React, { useState } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // template d-17ac661c869f420192c6352dbcd9e570
      //await sendPasswordResetRequest(email); // Call your API function to send the reset request
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/users`, // Replace with your API URL
        { email },
        {
          headers: {
            'x-reset-password': 'true',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
        }
      );
  
      if (response.status === 200) {
        console.log('User token updated successfully');
        // You can get the token from the response here if needed
        // For security reasons, it is not recommended to send the token in the response
      } else {
        console.error('Error updating user token:', response.statusText);
        setLoading(false);
      }

      setMessage('If an account with that email exists, then a password reset link has been sent to it.');
      setLoading(false);

      setError('');
    } catch (err) {
      setMessage('');
      setLoading(false);
      setError('An error occurred while sending the password reset link. Please try again.');
    }
  };

  return (
<div className="forgot-password-section">
<div className="forgot-password-box">
  <form onSubmit={handleSubmit}>

    <label htmlFor="email">Enter Your Email Address:</label>
    <input
      type="email"
      id="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />  <button type="submit">
    {loading ? (
      <Spinner animation="border" size="sm" />
    ) : (
      'Send Password Reset Link'
    )}
  </button>
  
   <br/>
  </form>
{message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
</div>

</div>
  );
};

export default ForgotPassword;
