import React, { useState, useEffect } from 'react';
import './Likes.css'; // Import CSS file

function Likes( postId ) {
  const [showLikes, setShowLikes] = useState(false);
  const [likers, setLikers] = useState([]);

  useEffect(() => {
    if (showLikes) {
      // Replace this with a call to your API to fetch the likers
     // fetchLikers(postId)
      //  .then(setLikers);
    }
  }, [showLikes]);

  return (
    <div 
      className="like-counter" 
      onMouseEnter={() => setShowLikes(true)} 
      onMouseLeave={() => setShowLikes(false)}
    >
      {post.total_likes} likes
      {showLikes && (
        <div className="likes-dropdown">
          {likers.map(liker => (
            <div key={liker.id}>{liker.name}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Likes;
