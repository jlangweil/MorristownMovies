// RestaurantReview.js

import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import Creatable from 'react-select/creatable';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import './RestaurantReview.css';

function RestaurantReview(props) {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(3);
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [newRestaurant, setNewRestaurant] = useState(false);
  const [addressOptions, setAddressOptions] = useState([]);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);
  const [reviewValidation, setReviewValidation] = useState('');
  const [addressValidation, setAddressValidation] = useState('');
  const [cuisineValidation, setCuisineValidation] = useState('');


  const { userId } = useAuth();
  


  const cuisineOptions = [
    { value: 'US', label: 'American' },
    { value: 'IT', label: 'Italian' },
    { value: 'JP', label: 'Japanese' },
    { value: 'CN', label: 'Chinese' },
    { value: 'IN', label: 'Indian' },
    { value: 'FR', label: 'French' },
    { value: 'MX', label: 'Mexican' },
    { value: 'ES', label: 'Spanish' },
    { value: 'TH', label: 'Thai' },
    { value: 'TR', label: 'Turkish' },
    { value: 'GR', label: 'Greek' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Clear existing validation messages
    setReviewValidation('');
    setAddressValidation('');
    setCuisineValidation('');
    // Check if required fields have values
    if (!review) {
        setReviewValidation('Review text is required');
        return;
    }

    if (newRestaurant) {
        if (!selectedCuisine) {
        setCuisineValidation('Cuisine is required');
        return;
        }

        if (!selectedAddress) {
        setAddressValidation('Address is required');
        return;
        }
    }
    try {
      const currentDate = new Date().toISOString();
  
      if (!newRestaurant) {
        // Perform API call to save the review
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/restaurants`, {
          review: {
            RestaurantID: props.restaurantBeingReviewed.id,
            UserID: userId,
            ReviewText: review,
            ReviewDate: currentDate,
            Rating: rating,
          },
        }, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          }
        });
  
        // Hide the form after submitting the review
        if (response.status === 200 || response.status === 201) {
          // Clear form data
          setReview('');
          setRating(3);
          props.onSubmit();
        }
      } else {
        // Perform API call to save the new restaurant and the review
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/restaurants`, {
          restaurant: {
            RestaurantName: props.restaurantBeingReviewed.RestaurantName,
            cuisine: selectedCuisine.value,
            StreetAddress: selectedAddress.label,
            latitude: parseFloat(selectedAddress.value.split(',')[0]),
            longitude: parseFloat(selectedAddress.value.split(',')[1]),
          },
          review: {
            UserID: userId,
            ReviewText: review,
            ReviewDate: currentDate,
            Rating: rating,
          },
        }, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          }
        });
  
        // Hide the form after submitting the review
        if (response.status === 200 || response.status === 201) {
          // Clear form data
          setReview('');
          setRating(3);
          setSelectedCuisine('');
          setSelectedAddress('');
          props.onSubmit();
        }
      }
    } catch (error) {
      //setServerError('An error occurred while submitting the review.');
    }
  };
  

  const handleStarClick = (index) => {
    setRating(index);
  };

  const handleCuisineChange = (selectedOption) => {
    setSelectedCuisine(selectedOption);
  };

  const handleAddressChange = (selectedOption) => {
    setSelectedAddress(selectedOption);
  };

  const fetchAddressData = async (restaurantName) => {
    console.log('fetchaddress');
    setIsLoadingAddresses(true); // Set isLoadingAddresses to true before the API call
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/restaurants`, {
        params: {
          search: restaurantName,
        }, 
        headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      });
  
      if (response.status === 200) {
        console.log(response.data);
        const formattedOptions = response.data.map(item => ({
          label: item.address,
          value: `${item.latitude},${item.longitude}`,
        }));
        setAddressOptions(formattedOptions);
      }
    } catch (error) {
      console.error("Error fetching address data:", error);
    } finally {
      setIsLoadingAddresses(false); // Set isLoadingAddresses to false after the API call completes
    }
  };
  

  useEffect(() => {
    if (
      props.restaurantBeingReviewed.RestaurantName &&
      (!props.restaurantBeingReviewed.cuisine || props.restaurantBeingReviewed.cuisine === '')
    ) {
      setNewRestaurant(true);
      fetchAddressData(props.restaurantBeingReviewed.RestaurantName);
    } else {
      setNewRestaurant(false);
    }
  }, [props.restaurantBeingReviewed.RestaurantName]);

  useEffect(() => {
    if (addressOptions.length > 0) {
      setSelectedAddress(addressOptions[0]);
    } else {
      setSelectedAddress(null);
    }
  }, [addressOptions]);
  
  
  

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(22,22,21,1)',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxShadow: 'none',
      '&:hover': {
        borderColor: 'rgba(204,204,204,1)',
      },
    }),
    input: (provided) => ({
      ...provided,
      color: 'white',
      width: '250px',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'rgba(255,255,255,.5)',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(22,22,21,1)',
    }),
    option: (provided) => ({
      ...provided,
      color: 'white',
      backgroundColor: 'rgba(22,22,21,1)',
    }),
  };

 /*  useEffect(() => {
    console.log('props.restaurantBeingReviewed:', JSON.stringify(props.restaurantBeingReviewed, null, 2));
  }, [props.restaurantBeingReviewed]); */
  

  return (
    <div className="food-review">
        <Form onSubmit={handleSubmit}>
        <Row className="justify-content-center">
            <Col xs={12} lg={8} className="mb-3 mx-auto">
                <Form.Group controlId="reviewText">
                    <Form.Label>Review {props.restaurantBeingReviewed.RestaurantName}</Form.Label>
                    <Form.Control
                    as="textarea"
                    rows={3}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    />
                    {reviewValidation && <Form.Text className="text-danger">{reviewValidation}</Form.Text>}
                </Form.Group>
            </Col>
      </Row>
      {props.restaurantBeingReviewed.cuisine && props.restaurantBeingReviewed.cuisine !== "" ? null : (
        <Row className="justify-content-center">
            <Col xs={6} lg={4} className="mb-3 mx-auto">
            <div>
                <Select
                value={selectedCuisine}
                options={cuisineOptions}
                placeholder="Select a cuisine"
                onChange={handleCuisineChange}
                styles={customStyles}
                isClearable
                isSearchable
                />
                {cuisineValidation && <Form.Text className="text-danger">{cuisineValidation}</Form.Text>}
            </div>
            </Col>
        </Row>
        )}

        {props.restaurantBeingReviewed.cuisine && props.restaurantBeingReviewed.cuisine !== "" ? null : (
        <Row className="justify-content-center">
        <Col xs={6} className="mb-3 mx-auto">
             <div>
                <Creatable
                    value={selectedAddress}
                    options={addressOptions}
                    placeholder="Enter or select closest address"
                    onChange={handleAddressChange}
                    styles={customStyles} 
                    isLoading={isLoadingAddresses}
                    isClearable
                    isSearchable
                />
                {addressValidation && <Form.Text className="text-danger">{addressValidation}</Form.Text>}
                </div>
            </Col>
        </Row>
        )}
      <Row className="justify-content-center">
      <Col xs={12} lg={8} className="mb-3 mx-auto">
        <Form.Group controlId="reviewStars">
          <Form.Label className="d-flex justify-content-center">Rate the Restaurant:</Form.Label>
          <div className="d-flex justify-content-center">
            {[1, 2, 3, 4, 5].map((starIndex) => (
              <i
                key={starIndex}
                className={`fa-star ${rating >= starIndex ? 'fas' : 'far'}`}
                style={{ color: 'yellow', cursor: 'pointer', margin: '0 3px' }}
                onClick={() => handleStarClick(starIndex)}
              ></i>
            ))}
          </div>
        </Form.Group>
      </Col>
    </Row>

      <Row className="justify-content-center">
        <Col xs={12} lg={8} className="d-flex justify-content-end mb-3 mx-auto"> 
           
            <Button variant="primary" type="submit">
            Submit
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button variant="secondary" type="cancel" onClick={props.onCancel}>
            Cancel
            </Button>
        </Col>
       
    </Row>
    
    </Form>
    </div>
    
  );
}

export default RestaurantReview;
