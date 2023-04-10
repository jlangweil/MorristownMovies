import React from 'react';
import axios from 'axios';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';

const ImageUpload = ({ onImageUpload }) => {
  const handleUpload = async ({ file }) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/images`, {
          data: event.target.result,
        });

        if (response.status === 200) {
          onImageUpload();
        } else {
          console.error('Error uploading image:', response.statusText);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <Dropzone
      accept="image/*"
      maxFiles={1}
      multiple={false}
      inputContent="Upload an image"
      styles={{
        dropzone: {
          border: 'none',
          minHeight: 'unset',
          maxHeight: 'unset',
          padding: '1em 1em',
          backgroundColor: 'grey',
          borderRadius: '4px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          cursor: 'pointer',
          width: '150px',
        },
        inputLabel: { color: 'white', fontSize: '14px', margin: 0 },
        inputLabelWithFiles: { color: 'white', fontSize: '14px', margin: 0 },
      }}



      onSubmit={handleUpload}
      onChangeStatus={(fileWithMeta, status) => {
        if (status === 'done') {
          fileWithMeta.remove();
        }
      }}
    />
  );
};

export default ImageUpload;
