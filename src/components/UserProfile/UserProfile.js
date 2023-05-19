// UserProfile.js
import React, { useState, useRef } from 'react';
import { Container, Row, Col, Form, Spinner } from 'react-bootstrap';
import { readAndCompressImage } from 'browser-image-resizer';
import { BsUpload } from 'react-icons/bs';
import { useAuth } from '../../AuthContext';
import axios from 'axios';
import './UserProfile.css';

const UserProfile = () => {
  const { userId, currentUser, userEmail, city, state, pic, updatePic } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64Image, setBase64Image] = useState('');
  const inputRef = useRef();
  const [email, setEmail] = useState(userEmail || '');
  const [userCity, setUserCity] = useState(city || '');
  const [userState, setUserState] = useState(state || '');
  const [isUpdatingPic, setIsUpdatingPic] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL;
  
  const handleFileChange = async (e) => {
    
    const file = e.target.files[0];
    setSelectedFile(file);
  
    if (file) {
      setIsUpdatingPic(true);
      try {
        const config = {
          quality: 1.0,
          maxWidth: 200,
          maxHeight: 200,
          autoRotate: true,
          debug: true,
        };
        const compressedImage = await readAndCompressImage(file, config);
        const reader = new FileReader();
        reader.readAsDataURL(compressedImage);
        reader.onloadend = async () => {
          const base64 = reader.result;
          setBase64Image(base64);
  
          // Upload the compressed image to Cloudinary
          const formData = new FormData();
          formData.append('user_id', userId); // Replace `userId` with the actual user ID
          formData.append('image', compressedImage);
  
          try {
            const response = await axios.put(`${apiUrl}/images`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`, // Replace `API_AUTH_TOKEN` with your actual token
              },
            });
  
            // Check if the upload was successful
            if (response.data && response.data.success) {
              // Get the uploaded image URL from the response
              const uploadedImageUrl = response.data.data.secure_url;
              console.log(uploadedImageUrl);
  
              // Update the user's profile picture URL in your database
              await updateProfilePicture(uploadedImageUrl);
            } else {
              console.error('Image upload failed:', response.data);
            }
          } catch (error) {
            console.error('Error uploading image:', error);
            setIsUpdatingPic(false);

          }
        };
      } catch (error) {
        console.error('Error resizing image:', error);
        setIsUpdatingPic(false);
      }
      finally {
        setIsUpdatingPic(false);
      }
    }
  };

  const updateProfilePicture = async (uploadedImageUrl) => {
    try {
      console.log("Payload:", { id: userId, pic: uploadedImageUrl });

      const response = await axios.patch(`${apiUrl}/users`, {
        id: userId,
        pic: uploadedImageUrl,
      }, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      });
      console.log(response.data);
      updatePic(uploadedImageUrl);
    } catch (error) {
      console.error('Error updating profile picture:', error);
    }
  };

/*   useEffect(() => {
    if (base64Image) {
      updateProfilePicture();
    }
  }, [base64Image]); */

  const handleClick = () => {
    inputRef.current.click();
  };

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
    'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
  ];

  const validateForm = () => {

    
    if (!email || !userCity || !userState) {
      setErrorMessage('Fill in required fields.');
      return false;
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }

    if ((password || confirmPassword) && password !== confirmPassword) {
        alert('validate2');
    
      setErrorMessage('Passwords do not match');
      return false;
    }

    setErrorMessage('');
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      // Handle form submission
    }
  };

  return (
    <Container className="user-update-container">
    <Row className="justify-content-center">
      <Col xs={12} className="mb-3 mx-auto text-center">
        <div>
          <h3>Academy Member: {currentUser}</h3>
        </div>
      </Col>
    </Row>
    <Row className="justify-content-center">
      <Col xs={12} className="mb-3 mx-auto text-center">
        <div>
          <img src={pic} />
        </div>
      </Col>
    </Row>
    {isUpdatingPic && (
    <Row>
      <Col>
        <center>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Updating...</span>
          </Spinner>
        </center>
      </Col>
    </Row>
          )}
    <Row className="justify-content-center">
      <Col xs={6}>
      <div className="upload-container" onClick={handleClick}>
        <BsUpload className="upload-icon" />
        <p className="upload-text">Click to upload a new profile picture</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
      </Col>
    </Row>
    <Row className="justify-content-center">
    <Col xs={12} md={6}>
      <div className="userProfileForm">
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
            <Form.Label className="userProfileForm-label">Email</Form.Label>
            <Form.Control type="email" className="userProfileForm-input" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="city">
            <Form.Label className="userProfileForm-label">City</Form.Label>
            <Form.Control type="text" className="userProfileForm-input" value={userCity} onChange={(e) => setUserCity(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="state" className="no-validation-spacing">
            <Form.Label>State</Form.Label>
            <div className="custom-dropdown-container">
                <Form.Control as="select" name="state" value={userState} onChange={(e) => setUserState(e.target.value)}>
                {states.map((state, index) => (
                    <option key={index}>{state}</option>
                ))}
                </Form.Control>
            </div>
            </Form.Group>
          <Form.Group controlId="password">
            <Form.Label className="userProfileForm-label">New Password</Form.Label>  {/* don't update passwords if they are blank */}
            <Form.Control type="password" className="userProfileForm-input" onChange={(e) => setPassword(e.target.value)}/>
          </Form.Group>
          <Form.Group controlId="reenterPassword">
            <Form.Label className="userProfileForm-label">Re-enter New Password</Form.Label>
            <Form.Control type="password" className="userProfileForm-input" onChange={(e) => setConfirmPassword(e.target.value)}/>
          </Form.Group>
          <br/>{errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="btn btn-primary userProfileForm-button">Update</button>
        </Form>
      </div>
    </Col>
  </Row>
    </Container>
  );
};

export default UserProfile;
