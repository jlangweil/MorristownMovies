import React from 'react';
import './Forum.css';

const Forum = () => {
  return (
    <div className="forum-container">
      <iframe
        src="https://forum.morristownmovies.com/" // Replace with the actual forum URL
        title="Forum"
        className="external-forum"
        width="100%"
        height="1000" // Adjust the height as needed
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default Forum;
