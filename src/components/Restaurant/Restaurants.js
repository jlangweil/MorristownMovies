// Restaurants.js
import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Creatable from 'react-select/creatable';
import axios from 'axios';
import MapWithRestaurants from './MapWithRestaurants';
import RestaurantReview from './RestaurantReview';
import './Restaurants.css';

   // Add this function outside the Restaurants component
   function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

const Restaurants = () => {

  const [food, setFood] = useState([]);  //food reviews
  const [restaurants, setRestaurants] = useState([]);  //list of distinct restaurants and geolocations
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [restaurantNameFilter, setRestaurantNameFilter] = useState("");
  const [showReview, setShowReview] = useState(false);
  const [restaurantBeingReviewed, setRestaurantBeingReviewed] = useState("");


  const apiUrl = process.env.REACT_APP_API_URL;
  
  const handleRestaurantNameFilterChange = (newValue) => {
    setRestaurantNameFilter(newValue ? newValue.value : "");
  };

  const handleInputChange = (inputValue) => {
    setRestaurantBeingReviewed(inputValue || "");
  };
  

  const restaurantOptions = restaurants.map((restaurant) => ({
    value: restaurant.RestaurantName,
    label: restaurant.RestaurantName,
  }));

// Inside the Restaurants component
const fetchFood = useCallback(
  debounce(async () => {
    try {
      const response = await axios.get(`${apiUrl}/food?page=${page}&limit=10&movie=${encodeURIComponent(filter)}`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      });
      if (response.data.length < 10) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      setFood(prevFood => (page === 1 ? response.data : [...prevFood, ...response.data]));
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, 300),
  [apiUrl, filter, page]
);

useEffect(() => {
  fetchFood();
}, [fetchFood]);

  
const fetchRestaurants = async () => {
  try {
    const response = await axios.get(`${apiUrl}/restaurants`);
    setRestaurants(response.data);
    setLoading(false);
  } catch (error) {
    setError(error);
    setLoading(false);
  }
};

useEffect(() => {
  fetchRestaurants();
}, []);

const handleReviewSubmit = () => {
  // Your logic for handling review submission
  setShowReview(false);
};

const handleReviewCancel = () => {
  setShowReview(false);
  setRestaurantBeingReviewed('');
  setRestaurantNameFilter('');
};

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'black',
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
    backgroundColor: 'black',
  }),
  option: (provided) => ({
    ...provided,
    color: 'white',
    backgroundColor: 'black',
  }),
};


  return (
    <Container  className="restaurants-container" style={{ overflowX: 'hidden' }}>
      <Row className="justify-content-center ">
        <Col>
            <div class="restaurant-header">Restaurants</div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} className="mb-3 mx-auto">
          <MapWithRestaurants restaurants={restaurants} />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} className="mb-3 mx-auto">
          <center><h3>Member reviews coming soon!</h3></center>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} lg={8} className="mb-3 mx-auto">
          <div className="toolbar">
          <Creatable
              options={restaurantOptions}
              placeholder="Enter restaurant name"
              value={
                restaurantNameFilter
                  ? { value: restaurantNameFilter, label: restaurantNameFilter }
                  : null
              }
              onChange={handleRestaurantNameFilterChange}
              onInputChange={handleInputChange}
              isClearable
              isSearchable
              styles={customStyles}
              noOptionsMessage={() => 'Add new restaurant'}
              formatCreateLabel={(inputValue) => `Click to review: "${inputValue}"`}
              isDisabled={showReview}
            />
            <button onClick={() => {
              setRestaurantBeingReviewed(restaurantNameFilter);
              setShowReview(true);
            }} className={`add-review-button${!restaurantNameFilter ? " disabled" : ""}`}  disabled={!restaurantNameFilter}>
              New Review
            </button>
          </div>
        </Col>
      </Row>
      {showReview && 
      <Row className="justify-content-center">
        <Col xs={12} className="mb-3 mx-auto">
        <RestaurantReview onSubmit={handleReviewSubmit} onCancel={handleReviewCancel} restaurantBeingReviewed={restaurantBeingReviewed}/>
        </Col>
      </Row>}
    
<Row className="justify-content-center" style={{ overflowX: 'hidden' }}>
  {restaurants
    .filter((restaurant) =>
      restaurant.RestaurantName.toLowerCase().includes(restaurantNameFilter.toLowerCase())
    )
    .map((restaurant) => (
      <Col key={restaurant.id} xs={12} lg={8} className="mb-3 mx-auto" >
        <Card className="restaurant-item" >
          <Card.Body className="restaurant-info-card" style={{ padding: "0.1rem" }}>
            <Row > 
              <Col xs={10}>
                <h3 className="restaurant-name">
                  {restaurant.RestaurantName}
                </h3>
              </Col>
              {restaurant.cuisine && (
                <Col xs={2} className="d-flex justify-content-end">
                  <img
                    src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/${restaurant.cuisine.toLowerCase()}.svg`}
                    alt={`${restaurant.cuisine.toUpperCase()} Flag`}
                    width="24"
                    height="18"
                  />
                </Col>
              )}
            </Row>
            <Row>
              <Col xs={12}>
                <p className="restaurant-address">
                  {restaurant.StreetAddress}, {restaurant.City}, NJ
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        {/* <div className="review-separator"></div>
        <div className="reviews">
          {sampleReviews
            .filter((reviewItem) => reviewItem.restaurantId === restaurant.id)
            .map((reviewItem) => (
              <div key={reviewItem.id} className="review">
                <p className="review-text">{reviewItem.text}</p>
                <p className="review-user">- {reviewItem.user}</p>
              </div>
            ))}
        </div> */}
      </Col>
    ))}
</Row>
</Container>
  );
};


export default Restaurants;
