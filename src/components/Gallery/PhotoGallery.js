import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { Spinner } from 'react-bootstrap';
import ImageUpload from './ImageUpload';
import './PhotoGallery.css';
import { useAuth } from '../../AuthContext';

const PhotoGallery = () => {
  const [images, setImages] = useState([]);
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/images`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        }
      });
      const imageUrls = response.data;
  
      const imageObjects = [];
  
      for (const url of imageUrls) {
        const imageExists = await checkImageExists(url);
        if (imageExists) {
          const scaleFactor = Math.random() * (1.5 - 0.5) + 0.5;
          const cacheBustedUrl = `${url}?${new Date().getTime()}`;
          imageObjects.push({
            src: cacheBustedUrl,
            width: scaleFactor * 4,
            height: scaleFactor * 3,
          });
        }
      }
      setLoading(false);
      setImages(imageObjects);
    } catch (error) {
      console.error('Error fetching images:', error);
      setLoading(false);
    }
  };

  const checkImageExists = async (url) => {
    try {
      await axios.head(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const onImageUpload = async () => {
    await fetchImages();
  };

  const openLightbox = (event, { photo, index }) => {
    setCurrentImage(index);
    setLightboxIsOpen(true);
  };

  const closeLightbox = () => {
    setCurrentImage(0);
    setLightboxIsOpen(false);
  };

  return (
    <div>
      <center><p className="gallery-title">The Gallery</p></center>
      { loading && (
        <center><Spinner animation="border" role="status"/></center>
      )}
      <Gallery photos={images} onClick={openLightbox} />
      <br />
      { currentUser && (
      <center><ImageUpload onImageUpload={onImageUpload} /></center>
      )}
      <ModalGateway>
        {lightboxIsOpen && (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={images.map((image) => ({ src: image.src }))}
              onClose={closeLightbox}
              components={{ Footer: () => null }}
            />
          </Modal>
        )}
      </ModalGateway>
    </div>
  );
};

export default PhotoGallery;