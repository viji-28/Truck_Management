import React, { useState } from 'react';
import './styles/driver.css';
import styledComponents from 'styled-components';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { AdminDriverSignUp } from '../actions';

const SELECT = styledComponents(Select)`width: 100%;
padding: 10px;
margin-bottom: 20px;
border: none;
border-radius: 5px;
box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
width:'50%';
outline:none
`;
const DriverForm = () => {
  const dispatch = useDispatch();
  const [licenseNo, setLicenseNo] = useState('');
  const [licensePhoto, setLicensePhoto] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const [licenseType, setLicenseType] = useState([]);
  const [shift, setShift] = useState('');
  const [truck, setTruck] = useState('');
  const [route, setRoute] = useState('');
  console.log('formData', {
    licenseNo,
    licensePhoto,
    userPhoto,
    licenseType,
    shift,
    truck,
    route,
  });

  const handleLicenseNoChange = (e) => {
    setLicenseNo(e.target.value);
  };

  const handleLicensePhotoChange = (e) => {
    setLicensePhoto(e.target.files[0]);
  };

  const handleUserPhotoChange = (e) => {
    setUserPhoto(e.target.files[0]);
  };

  const handleLicenseTypeChange = (e) => {
    const selectedOptions = Array.from(e).map((option) => option.value);
    setLicenseType(selectedOptions);
  };

  const handleShiftChange = (e) => {
    setShift(e.target.value);
  };

  const handleTruckChange = (e) => {
    setTruck(e.target.value);
  };

  const handleRouteChange = (e) => {
    setRoute(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('licenseNo', licenseNo);
    formData.append('licensePhoto', licensePhoto);
    formData.append('userPhoto', userPhoto);
    formData.append('licenseType', licenseType);
    formData.append('shift', shift);
    formData.append('truck', truck);
    formData.append('route', route);
    dispatch(AdminDriverSignUp(formData));
  };
  const options = [
    { value: '2 wheeler', label: '2 wheeler' },
    { value: '4 wheeler', label: '4 wheeler' },
    { value: 'heavy vehicle', label: 'heavy vehicle' },
  ];
  return (
    <form onSubmit={handleSubmit} className="driver-form">
      <div>
        <h1>
          <b>
            <u>Driver Details</u>
          </b>
        </h1>
      </div>
      <div className="DriverForm">
        <label htmlFor="licenseNo">License Number:</label>
        <input
          type="text"
          id="licenseNo"
          name="licenseNo"
          value={licenseNo}
          onChange={handleLicenseNoChange}
        />
      </div>
      <div className="DriverForm">
        <label htmlFor="licensePhoto">License Photo:</label>
        <input
          type="file"
          id="licensePhoto"
          name="licensePhoto"
          onChange={handleLicensePhotoChange}
        />
      </div>
      <div className="DriverForm">
        <label htmlFor="userPhoto">User Photo:</label>
        <input
          type="file"
          id="userPhoto"
          name="userPhoto"
          onChange={handleUserPhotoChange}
        />
      </div>
      <div className="DriverForm">
        <SELECT
          id="multi-select"
          options={options}
          // value={selectedOptions}
          onChange={handleLicenseTypeChange}
          placeholder="Lisence Type"
          isMulti
        />
      </div>
      <div className="DriverForm">
        <label htmlFor="shift">Shift:</label>
        <select
          id="shift"
          name="shift"
          onChange={handleShiftChange}
          className="dropdown"
        >
          <option value="">Select Shift</option>
          <option value="morning">Morning</option>
          <option value="evening">Evening</option>
          <option value="night">Night</option>
        </select>
      </div>
      <div className="DriverForm">
        <label htmlFor="truck">Truck:</label>
        <select
          id="truck"
          name="truck"
          onChange={handleTruckChange}
          className="dropdown"
        >
          <option value="">Select Truck</option>
          <option value="truck1">Truck 1</option>
          <option value="truck2">Truck 2</option>
          <option value="truck3">Truck 3</option>
        </select>
      </div>
      <div className="DriverForm">
        <label htmlFor="route">Route:</label>
        <select
          id="route"
          name="route"
          onChange={handleRouteChange}
          className="dropdown"
        >
          <option value="">Select Route</option>
          <option value="route1">Route 1</option>
          <option value="route2">Route 2</option>
          <option value="route3">Route 3</option>
        </select>
      </div>
      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  );
};

export default DriverForm;
