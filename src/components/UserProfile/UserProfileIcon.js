// UserProfileIcon.js

import React from 'react';
import { useAuth } from '../../AuthContext';
import styles from './UserProfileIcon.css';

const UserProfileIcon = ({ initial }) => {

  const { pic } = useAuth();
  
  return (
    <>
    {pic ? (
      <div class="profile-picture-wrapper">
     <div className="profile-picture" style={{ backgroundImage: `url(${pic})` }}></div>
    </div>
      


    ) : (
    <div className="star-container">
      <svg className="star" viewBox="-4 -4 58 58">
        <rect className="star-bg" width="100%" height="100%" />
        <polygon className="star-brass" points="25,1 32,18 50,18 36,29 40,47 25,38 10,47 15,29 1,18 19,18" />
      </svg>
      <span className="initial">{initial.toUpperCase()}</span>
    </div> 
    )
  }
  </>
  )
};


export default UserProfileIcon;
