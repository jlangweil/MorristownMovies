// Verify.js

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

function Verify() {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');  
  const email = new URLSearchParams(location.search).get('email');  
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyUser = async () => {

      if (!token || !email) {
        setMessage('Invalid link.');  //give option to send link again
        return;
      }

      try {
        await axios.put(`${apiUrl}/users`, {
            email: email,
            token: token,
          }, {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            },
          });
          

        setMessage('Thank you for verifying your email! Please click the login button to continue.');
      } catch (error) {
        setMessage('Verification failed');
      }
    };

    verifyUser();
  }, [location.search]);

  return (
    <div align="center">
      <h3>{message}</h3>
    </div>
  );
}

export default Verify;
/* Replace your-api-domain.com with your Vercel API domain.

Add a route in your frontend app (e.g., in App.js):
javascript
Copy code
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Verify from './Verify';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/verify" component={Verify} />
      </Switch>
    </Router>
  );
}

export default App;
This setup will direct the user to your main app domain when they click the verification link in the email. The frontend app will then communicate with the Vercel serverless API to verify the UUID token and update the user's status accordingly. */