// Restaurants.js
import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import MapWithRestaurants from './MapWithRestaurants';
import './Restaurants.css';




const sampleRestaurants = [{
  id: 1,
  RestaurantName: "The Committed Pig",
  StreetAddress: "28 W Park Pl",
  City: "Morristown",
  cuisine: "us"
},
{
  id: 2,
  RestaurantName: "South + Pine American Eatery",
  StreetAddress: "90 South St",
  City: "Morristown",
  cuisine: "us"
},
{
  id: 3,
  RestaurantName: "Jockey Hollow Bar & Kitchen",
  StreetAddress: "110 South St",
  City: "Morristown",
  cuisine: "us" // Unknown cuisine
},
{
  id: 4,
  RestaurantName: "Millie's Old World Meatballs and Pizza",
  StreetAddress: "60 South St",
  City: "Morristown",
  cuisine: "it" // Italian cuisine
},
{
  id: 5,
  RestaurantName: "Iron Bar",
  StreetAddress: "5 South St",
  City: "Morristown",
  cuisine: "us"
},
{
  id: 6,
  RestaurantName: "The Office Tavern Grill",
  StreetAddress: "3 South St",
  City: "Morristown",
  cuisine: "us"
},
{
  id: 7,
  RestaurantName: "Pomodoro Ristorante & Pizzeria",
  StreetAddress: "1255 Valley Rd",
  City: "Morristown",
  cuisine: "it"
},
{
  id: 8,
  RestaurantName: "Guerrero Mexican Restaurant",
  StreetAddress: "162 South St",
  City: "Morristown",
  cuisine: "mx" // Mexican cuisine
},
{
  id: 9,
  RestaurantName: "Origin Thai",
  StreetAddress: "10 South St",
  City: "Morristown",
  cuisine: "th" // Thai cuisine
},
{
  id: 10,
  RestaurantName: "End of Elm",
  StreetAddress: "140 Morris St",
  City: "Morristown",
  cuisine: "us"
},
{
  id: 11,
  RestaurantName: "Roots Steakhouse",
  StreetAddress: "40 W Park Pl",
  City: "Morristown",
  cuisine: "us"
},
{
  id: 12,
  RestaurantName: "Sushi Lounge",
  StreetAddress: "12 Schuyler Pl",
  City: "Morristown",
  cuisine: "jp" // Japanese cuisine
},
{
  id: 13,
  RestaurantName: "Nagano Japanese Restaurant",
  StreetAddress: "23 Washington St",
  City: "Morristown",
  cuisine: "jp"
},
{
  id: 14,
  RestaurantName: "David Todd's City Tavern",
  StreetAddress: "150 South St",
  City: "Morristown",
  cuisine: "us"
},
{
  id: 15,
  RestaurantName: "The Fig & Lily Garden",
  StreetAddress: "2 Cattano Ave",
  City: "Morristown",
  cuisine: "gr" // Unknown cuisine
},
{
  id: 16,
  RestaurantName: "La Campagna Ristorante",
  StreetAddress: "5 Elm St",
  City: "Morristown",
  cuisine: "it"
},
  {
    id: 17,
    RestaurantName: "Raul's Empanadas Town",
    StreetAddress: "63 Morris St",
    City: "Morristown",
    cuisine: "mx"
  },
  {
    id: 18,
    RestaurantName: "Mediterranean Grill",
    StreetAddress: "1198 Sussex Turnpike",
    City: "Morristown",
    cuisine: "gr"
  },
  
];

const sampleReviews = [
  {
    id: 1,
    restaurantId: 1,
    user: "John Doe",
    text: "Great food and atmosphere. Loved the burgers!",
  },
  {
    id: 2,
    restaurantId: 1,
    user: "Jane Smith",
    text: "The service was a bit slow, but the food was worth the wait.",
  },
  {
    id: 3,
    restaurantId: 2,
    user: "Alice Johnson",
    text: "Delicious and fresh food. The outdoor seating was fantastic!",
  },
  {
    id: 4,
    restaurantId: 2,
    user: "Bob Brown",
    text: "The kale salad was amazing! Great place for a date night.",
  },
  {
    id: 5,
    restaurantId: 2,
    user: "Charlie Green",
    text: "The staff was friendly and attentive. I'll definitely come back!",
  },
  {
    id: 6,
    restaurantId: 1,
    user: "Diana White",
    text: "Their brunch is a must-try! Don't miss the pancakes.",
  },
];

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

  const apiUrl = process.env.REACT_APP_API_URL;
  


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
      <Row className="justify-content-center" style={{ overflowX: 'hidden' }} >
        <InfiniteScroll
          dataLength={food.length}
          next={() => {
            setPage(prevPage => prevPage + 1);
            fetchFood();
          }}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p><center>End of Reviews</center></p>}
        >
        {food
            .map(review => (
            
              <Col key={review.id} xs={12} lg={8} className="mb-3 mx-auto">

                        <div className="restaurant-item">
                          <div className="restaurant-info">
                          <h3 className="restaurant-name">{review.RestaurantName} &nbsp;&nbsp;
                          {review.cuisine && (
                            <>
                              &nbsp;&nbsp;
                              <img
                                src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/${review.cuisine}.svg`}
                                alt={`${review.cuisine.toUpperCase()} Flag`}
                                width="32"
                                height="24"
                              />
                            </>
                          )}
                          </h3>
                            <p className="restaurant-address">
                            

                              {review.StreetAddress}, {review.City}, NJ
                            </p>
                          </div>
                          <div className="review-separator"></div>
                          <div className="reviews">
                          {sampleReviews
                            .filter((reviewItem) => reviewItem.restaurantId === review.id)
                            .map((reviewItem) => (
                              <div key={reviewItem.id} className="review">
                                <p className="review-text">{reviewItem.text}</p>
                                <p className="review-user">- {reviewItem.user}</p>
                              </div>
                            ))}

                          </div>
                        </div>  
                        </Col>
      ))}
  </InfiniteScroll>
  </Row>

                  
     

    </Container>
  );
};






export default Restaurants;
