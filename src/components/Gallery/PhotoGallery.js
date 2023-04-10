import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Gallery from 'react-photo-gallery';
import { Modal } from 'react-bootstrap';
import './PhotoGallery.css';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState({ src: '', width: 0, height: 0 });

  useEffect(() => {
    async function fetchImageUrls() {
      // Fetch image URLs from the server
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/images`);
        const imageUrls = response.data;

        
        // Create the array of photos required by the react-photo-gallery component
        const photoArray = imageUrls.map((url) => {
          const scaleFactor = Math.random() * (1.5 - 0.5) + 0.5;
          return {
            src: url,
            width: scaleFactor * 4,
            height: scaleFactor * 3,
          };
        });

        setPhotos(photoArray);
      } catch (error) {
        console.error(error);
        alert('An error occurred while fetching image URLs.');
      }
    }

    fetchImageUrls();
  }, []);

  const handlePhotoClick = (event, { photo }) => {
    setSelectedPhoto(photo);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <center><p className="gallery-title">The Gallery</p></center>
      <Gallery photos={photos} onClick={handlePhotoClick} />
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Body>
          <img src={selectedPhoto.src} alt="" style={{ width: '100%', height: 'auto' }} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PhotoGallery;



