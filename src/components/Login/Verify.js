/* This will be used to verify a user's email by checking their UUID
1.  First a message will  be displayed informing them that an email has been sent 
2.  Send the email
3.  Link will contain api link */

// Verify.js
/* 
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Verify({ location }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyUser = async () => {
      const token = new URLSearchParams(location.search).get('token');
      if (!token) {
        setMessage('Invalid or missing token');
        return;
      }

      try {
        const response = await axios.get(`https://your-api-domain.com/api/verifyToken?token=${token}`);
        setMessage(response.data.message);
      } catch (error) {
        setMessage('Verification failed');
      }
    };

    verifyUser();
  }, [location.search]);

  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
}

export default Verify; */
