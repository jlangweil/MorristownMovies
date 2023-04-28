import React from 'react';
import { Link } from 'react-router-dom';

const SignUpVerification = () => {
  return (
    <div align="center">
      <h1>Thanks for registering! Welcome to the Morristown Movie Website!</h1>
      <br/>
      <p>To complete your registration, please check your inbox (and spam folder) for a validation email.<br/> Click the link provided in the email to verify your account and start enjoying the site.
      {/* <br/><br/>If you don't receive the email within a few minutes, <Link to="/login">Click Here</Link> to request a new validation email. */}
      </p>
      <Link to="/">Return Home</Link>
      <br/><br/>
    </div>
  );
};

export default SignUpVerification;
