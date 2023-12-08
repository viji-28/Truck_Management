import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './styles/route.css';
// import GoogleMapReact, { Marker } from 'google-map-react';
import { Map, GoogleApiWrapper, Polyline, Marker } from 'google-maps-react';
import { useDispatch } from 'react-redux';
import { routeSubmit } from '../actions';

const RouteForm = (props) => {
  let LocationData;

  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    from: '',
    to: '',
    country: '',
    state: '',
    locations: [{ id: 1, location: '', latitude: 0, longitude: 0 }],
  });
  const mapStyles = {
    width: '25%',
    height: '62%',
    // marginLeft: '30%',
  };

  const [markers, setMarkers] = useState([]);
  console.log('markers', markers);

  const handleTitleChange = async (e) => {
    const { value } = e.target;
    console.log('value', value);
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=AIzaSyD1n-Lml-bCOkTnNZs3uZNqq5IEyo7VQRY`
      );
      console.log('response', response);
      const addressComponents = response.data.results[0].address_components;
      const countryObj = addressComponents.find((component) =>
        component.types.includes('country')
      );
      const stateObj = addressComponents.find((component) =>
        component.types.includes('administrative_area_level_1')
      );
      const country = countryObj ? countryObj.long_name : '';
      const state = stateObj ? stateObj.long_name : '';
      setFormValues({ ...formValues, from: value, country, state });
    } catch (error) {
      console.error(error);
    }
  };

  const handleToChange = async (e) => {
    const { value } = e.target;
    console.log('valueto', value);
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=AIzaSyD1n-Lml-bCOkTnNZs3uZNqq5IEyo7VQRY`
      );
      console.log('response', response);
      setFormValues({ ...formValues, to: value });
    } catch (error) {
      console.error(error);
    }
  };

  const handleLocationChange = async (index, e) => {
    const { value } = e.target;
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=AIzaSyD1n-Lml-bCOkTnNZs3uZNqq5IEyo7VQRY`
      );
      const location = response.data.results[0].geometry.location;
      const formattedAddress = response.data.results[0].formatted_address;

      const updatedLocations = formValues.locations.map((loc) => {
        if (loc.id === index) {
          return {
            ...loc,
            location: formattedAddress,
            latitude: location.lat,
            longitude: location.lng,
          };
        } else {
          return loc;
        }
      });
      setMarkers(
        formValues.locations.map((location) => {
          return {
            lat: location.latitude,
            lng: location.longitude,
            text: location.location,
          };
        })
      );
      setFormValues({
        ...formValues,
        locations: updatedLocations,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddLocation = () => {
    const newId = formValues.locations.length + 1;
    setFormValues({
      ...formValues,
      locations: [
        ...formValues.locations,
        { id: newId, location: '', latitude: 0, longitude: 0 },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    dispatch(routeSubmit(formValues));
  };

  const handleRemoveLocation = (id) => {
    console.log('Before remove', formValues.locations);
    const updatedLocations = formValues.locations.filter(
      (loc) => loc.id !== id
    );
    console.log('After remove', updatedLocations);
    setFormValues({ ...formValues, locations: updatedLocations });
  };
  let waypoints = [];
  formValues.locations.map(
    (data) =>
      (waypoints = [...waypoints, { lat: data.latitude, lng: data.longitude }])
  );
  // const LocationLat = LocationData.latitude;
  // const LocationLng = LocationData.longitude;

  console.log(waypoints);

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div>
        <h1>
          <b>Route Details</b>
        </h1>
      </div>
      <div>
        <label>From</label>
        <input
          type="text"
          placeholder="Enter from Where "
          // value={formValues.title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <label>To</label>
        <input
          type="text"
          placeholder="Enter where To"
          // value={formValues.title}
          onChange={handleToChange}
        />
      </div>
      <div>
        <label>Country</label>
        <input
          type="text"
          value={formValues.country}
          placeholder="Country autofilled"
          disabled
        />
      </div>
      <div>
        <label>State/Province</label>
        <input
          type="text"
          value={formValues.state}
          placeholder="State autofilled"
          disabled
        />
      </div>
      <div className="LOCATIONS">
        {formValues.locations.map((location, index) => (
          <div key={location.id} className="LOCATION">
            <div
              className="LOCATION_HEADER"
              style={{ display: 'flex', flexDirection: 'row' }}
            >
              <label>Location {index + 1}</label>
              {formValues.locations.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveLocation(location.id)}
                  className="REMOVE_LOCATION"
                >
                  Remove
                </button>
              )}
            </div>
            <input
              type="text"
              placeholder="Enter Waypoint"
              // value={location.location}
              onChange={(e) => handleLocationChange(location.id, e)}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddLocation}>
          Add Location
        </button>
      </div>
      <button type="submit">Submit</button>

      <div style={{ height: '400px', width: '100%' }}>
        <Map
          google={props.google}
          zoom={4}
          style={mapStyles}
          initialCenter={{
            lat: 8.5241,
            lng: 76.9366,
          }}
          // center={{ LocationLat, LocationLng }}
          streetView={true}
        >
          {waypoints.map((waypoint, index) => (
            <Marker
              key={index}
              position={{ lat: waypoint.lat, lng: waypoint.lng }}
              name={`Marker ${index + 1}`}
              stopover={true}
            />
          ))}
          <Polyline
            path={waypoints}
            options={{
              strokeColor: '#0000FF',
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
          />
        </Map>
      </div>
    </form>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD1n-Lml-bCOkTnNZs3uZNqq5IEyo7VQRY',
})(RouteForm);
