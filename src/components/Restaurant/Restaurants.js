// Restaurants.js
import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Creatable from 'react-select/creatable';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import MapWithRestaurants from './MapWithRestaurants';
import RestaurantReview from './RestaurantReview';
import './Restaurants.css';

   // Add this function outside the Restaurants component
/*    function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  } */

const Restaurants = () => {

  const [reviews, setReviews] = useState([]);  //food reviews
  const [restaurants, setRestaurants] = useState([]);  //list of distinct restaurants and geolocations
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [restaurantNameFilter, setRestaurantNameFilter] = useState("");
  const [showReview, setShowReview] = useState(false);
  const [restaurantBeingReviewed, setRestaurantBeingReviewed] = useState({});
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  
 /*  const handleRestaurantNameFilterChange = (newValue) => {
    setRestaurantNameFilter(newValue ? newValue.value : "");
  }; */

 /*  const handleInputChange = (inputValue) => {
    setRestaurantBeingReviewed(inputValue || "");
  }; */

const handleRestaurantNameFilterChange = (newValue) => {
  if (newValue) {
    setRestaurantNameFilter(newValue.value);

    const selectedRestaurant = restaurants.find(
      (restaurant) => restaurant.RestaurantName === newValue.value
    );

    if (selectedRestaurant) {
      setRestaurantBeingReviewed(selectedRestaurant);
    } else {
      setRestaurantBeingReviewed({ RestaurantName: newValue.value });
      //simulate clicking review here
      if (currentUser) {
        setShowReview(true);
      }
    }
  } else {
    // Handle the case when the input is empty or null
    setRestaurantNameFilter("");
    setRestaurantBeingReviewed({});
  }
};

  

  const handleInputChange = (inputValue, action) => {
    if (action.action === 'set-value') {
      const selectedRestaurant = restaurants.find(
        (restaurant) => restaurant.RestaurantName === inputValue.value
      );
  
      if (selectedRestaurant) {
        setRestaurantBeingReviewed(selectedRestaurant);
      } else {
        setRestaurantBeingReviewed({ RestaurantName: inputValue.value });
      }
    } /* else if (action.action !== 'input-blur' && action.action !== 'menu-close') {
      setInputValue(inputValue);
    } */
  };
  

  const restaurantOptions = restaurants.map((restaurant) => ({
    value: restaurant.RestaurantName,
    label: restaurant.RestaurantName,
  }));

  const fetchReviews = useCallback(
    async () => {
      try {
        const response = await axios.get(`${apiUrl}/restaurants?type=reviews`, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
        });
        setReviews(response.data);
      } catch (error) {
        setError(error);
      }
    },
    []
  );

useEffect(() => {
  fetchReviews();
}, [fetchReviews]);

  
const fetchRestaurants = async () => {
  try {
    const response = await axios.get(`${apiUrl}/restaurants`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    });
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
  // handling review submission
  setShowReview(false);
  setRestaurantNameFilter('')
  setTimeout(() => {
    fetchReviews();
  }, 500); // Introduce a 500ms delay before fetching reviews
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
     {/*  <Row className="justify-content-center">
        <Col xs={12} className="mb-3 mx-auto">
          <center><h3>Member reviews coming soon!</h3></center>
        </Col>
      </Row> */}
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
              formatCreateLabel={(inputValue) => `Click to add & review: "${inputValue}"`}
              isDisabled={showReview}
            />
            <button onClick={() => {
              // setRestaurantBeingReviewed(restaurantNameFilter);
              if (!currentUser) {
                navigate('/login');
                return;
              }
              setShowReview(true);
            }} className={`add-review-button${!restaurantNameFilter ? " disabled" : ""}`}  disabled={!restaurantNameFilter}>
             Review
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
                  {restaurant.StreetAddress}
                </p>
              </Col>
            </Row>
          
        <div className="review-separator"></div>
        <div className="reviews">
          
          {reviews
            .filter((reviewItem) => reviewItem.RestaurantID === restaurant.id)
            .map((reviewItem) => (
              <div key={reviewItem.id} className="review">
                <p className="review-text">{reviewItem.ReviewText}</p>
                <div className="rating-stars">
                {[...Array(5)].map((_, index) => {
                  const filledStar = index < reviewItem.Rating;

                  return (
                    <i
                      key={index}
                      className={`fa${filledStar ? "s" : "r"} fa-star`}
                      style={{ color: filledStar ? "gold" : "lightgray" }}
                    ></i>
                  );
                })}
              </div>
                <p className="review-user">Reviewed on {reviewItem.ReviewDate} by {reviewItem.first_name} {reviewItem.last_name}</p>
              </div>
            ))}
        </div></Card.Body>
        </Card>
      </Col>
    ))}
</Row>
</Container>
  );
};


export default Restaurants;
