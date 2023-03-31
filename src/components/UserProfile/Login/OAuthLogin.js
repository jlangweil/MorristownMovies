import React from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const OAuthLogin = ({ onGoogleSuccess, onGoogleFailure, onFacebookSuccess, onFacebookFailure }) => {
  return (
    <div>
      <GoogleLogin
        clientId="<YOUR_GOOGLE_CLIENT_ID>"
        buttonText="Login with Google"
        onSuccess={onGoogleSuccess}
        onFailure={onGoogleFailure}
        cookiePolicy={'single_host_origin'}
      />
      <FacebookLogin
        appId="<YOUR_FACEBOOK_APP_ID>"
        fields="name,email,picture"
        textButton="Login with Facebook"
        callback={onFacebookSuccess}
        onFailure={onFacebookFailure}
      />
    </div>
  );
};

export default OAuthLogin;
