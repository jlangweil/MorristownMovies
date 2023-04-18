import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import './MapsWithRestaurants.css';

/* const getCoordinates = async (address) => {
    try {
      const response = await axios.get(`/search`, {
        params: {
          q: address,
          format: 'json',
        },
      });
  
      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        console.log(lat);
        return [parseFloat(lat), parseFloat(lon)];
      } else {
        throw new Error('No results found for address');
      }
    } catch (error) {
      console.error(`Error getting coordinates for address: ${address}`, error);
      return null;
    }
  };
   */
  

// Fix for the marker icon issue
const defaultIcon = new L.Icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
});

const MapWithRestaurants = ({ restaurants }) => {
  const defaultPosition = [40.7968, -74.4815]; // Northern NJ coordinates
  const zoom = 14;

  const [markerPositions, setMarkerPositions] = useState([]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const positions = [];
  
      for (const restaurant of restaurants) {
        const { latitude, longitude } = restaurant;
  
        // Skip restaurants with null or invalid coordinates
        if (latitude && longitude) {
          positions.push({
            id: restaurant.id,
            RestaurantName: restaurant.RestaurantName,
            coords: { lat: latitude, lng: longitude },
          });
        }
      }
  
      setMarkerPositions(positions);
    };
  
    fetchCoordinates();
  }, [restaurants]);
  

  return (
    <MapContainer center={defaultPosition} zoom={zoom} className="map-wrapper">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markerPositions.map((position) =>
        position.coords ? (
          <Marker key={position.id} position={position.coords} icon={defaultIcon}>
            <Popup>
              {position.RestaurantName} 
            </Popup>
          </Marker>
        ) : null,
      )}
    </MapContainer>
  );
};

export default MapWithRestaurants;
