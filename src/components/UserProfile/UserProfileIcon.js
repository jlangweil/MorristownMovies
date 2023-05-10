// UserProfileIcon.js

import React from 'react';
import { useAuth } from '../../AuthContext';
import './UserProfileIcon.css';

const UserProfileIcon = ({ initial, imageUrl, showArrow }) => {

  const { pic } = useAuth();
  const imageSrc = imageUrl || pic;
  const wrapperClass = showArrow
  ? 'profile-picture-wrapper profile-picture-wrapper-arrow'
  : 'profile-picture-wrapper';

  return (
    <>
    {imageSrc ? (
      <div class={wrapperClass}>
     <div className="profile-picture" style={{ backgroundImage: `url(${imageSrc})` }}></div>
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
