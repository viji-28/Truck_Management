import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteListing } from '../actions';
import './styles/route.css';

const routesData = [
  { name: 'Route 1', distance: '5 km', difficulty: 'Easy' },
  { name: 'Route 2', distance: '10 km', difficulty: 'Moderate' },
  { name: 'Route 3', distance: '15 km', difficulty: 'Difficult' },
];

const RoutesForm = () => {
  const dispatch = useDispatch();
  const { routeListing } = useSelector((e) => e.functionReducer);
  console.log('routeListing', routeListing);

  useEffect(() => {
    dispatch(RouteListing());
  }, []);
  //   const RouteMap = routeListing.map((data, index) => {
  //     return (lat = locations.latitude), (lon = locations.longitude);
  //   });
  function distance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    console.log('distance', distance);
    return distance;
  }

  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  function getDifficulty(listing1, listing2) {
    const distanceBetweenListings = distance(
      listing1.latitude,
      listing1.longitude,
      listing2.latitude,
      listing2.longitude
    );
    if (distanceBetweenListings < 10) {
      return 'Easy';
    } else if (distanceBetweenListings < 50) {
      return 'Moderate';
    } else {
      return 'Difficult';
    }
  }

  return (
    <div className="routes-container">
      <div className="add-route-container">
        <button className="add-route-button">Add Route</button>
      </div>
      <div className="route-list">
        {routeListing.map((route, index) => (
          <div className="route-item" key={index}>
            <div className="route-name">{route.title}</div>
            <div className="route-details">
              <div className="route-distance">{route.distance}</div>
              <div className="route-difficulty">
                {getDifficulty(route, routesData[index])}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoutesForm;
