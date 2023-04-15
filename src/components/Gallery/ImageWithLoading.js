import React, { useState, useEffect } from 'react';

const ImageWithLoading = ({ src, alt }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setImageLoaded(true);
  }, [src]);

  return (
    <>
      {!imageLoaded && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Add a spinner or any loading indicator here */}
        </div>
      )}
      <img
        src={src}
        alt={alt}
        style={{
          display: imageLoaded ? 'block' : 'none',
          objectFit: 'cover',
        }}
      />
    </>
  );
};

export default ImageWithLoading;
