import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { truckBrandData, TrucksListing, truckSubmit } from '../actions';
import './styles/truck.css';
import { Dna } from 'react-loader-spinner';

const Trucks = () => {
  const dispatch = useDispatch();
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [variant, setVariant] = useState('');
  const [VIN, setVIN] = useState('');
  const [engineNo, setEngineNo] = useState('');
  const [chasisNo, setChasisNo] = useState('');
  const [RCNo, setRCNo] = useState('');
  const [year, setYear] = useState('');
  const [rcPhoto, setRcPhoto] = useState(null);
  const [truckPhotos, setTruckPhotos] = useState([]);

  useEffect(() => {
    dispatch(TrucksListing());
  }, []);

  console.log('truckPhotos', {
    brand,
    model,
    variant,
    VIN,
    engineNo,
    chasisNo,
    RCNo,
    year,
    rcPhoto,
    truckPhotos,
  });
  const { truckdata, trucksbranddata } = useSelector(
    (state) => state.functionReducer
  );
  const { loader } = useSelector((state) => state.commonReducer);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('brand', brand);
    formData.append('model', model);
    formData.append('variant', variant);
    formData.append('VIN', VIN);
    formData.append('engineNo', engineNo);
    formData.append('chasisNo', chasisNo);
    formData.append('RCNo', RCNo);
    formData.append('year', year);
    [rcPhoto].forEach((photo) => formData.append('truckPhotos', photo));
    truckPhotos.forEach((photo) => formData.append('truckPhotos', photo));
    dispatch(truckSubmit(formData));
    // send form data to backend here
  };

  const modelMap = trucksbranddata?.truck?.map((data, index) => {
    return (
      <option value={data.name} key={index}>
        {data.name}
      </option>
    );
  });

  const variantMap = trucksbranddata?.variant?.map((data, index) => {
    return (
      <option value={data.name} key={index}>
        {data.name}
      </option>
    );
  });

  const brandMap = truckdata?.brand?.map((data, index) => {
    return (
      <option value={data.name} key={index}>
        {data.name}
      </option>
    );
  });

  const getDataFromDb = (e) => {
    setBrand(e.target.value);
    dispatch(truckBrandData(e.target.value));
  };

  return (
    <div>
      {loader ? (
        <div>
          <Dna
            visible={true}
            height="100"
            width="100"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="form-container">
          <h1>
            <b>Truck Details</b>
          </h1>

          <div className="form-group">
            <label htmlFor="model">Brand:</label>
            <select
              type="text"
              id="brand"
              name="brand"
              value={brand}
              onChange={(e) => getDataFromDb(e)}
              required
            >
              <option value="">Select a Brand</option>
              {brandMap}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="model">Model:</label>
            <select
              id="model"
              name="model"
              value={model}
              disabled={!brand ? true : false}
              onChange={(e) => setModel(e.target.value)}
              required
            >
              <option value="">Select a model</option>
              {modelMap}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="variant">Variant:</label>
            <select
              id="variant"
              name="variant"
              value={variant}
              disabled={!model ? true : false}
              onChange={(e) => setVariant(e.target.value)}
              required
            >
              <option value="">Select a variant</option>
              {variantMap}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="VIN">VIN:</label>
            <input
              type="text"
              id="VIN"
              name="VIN"
              placeholder="VIn No"
              value={VIN}
              onChange={(e) => setVIN(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="engineNo">Engine No:</label>
            <input
              type="text"
              id="engineNo"
              name="engineNo"
              placeholder="engineNo"
              value={engineNo}
              onChange={(e) => setEngineNo(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="chasisNo">Chasis No:</label>
            <input
              type="text"
              id="chasisNo"
              name="chasisNo"
              placeholder="chasisNo"
              value={chasisNo}
              onChange={(e) => setChasisNo(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="RCNo">RC No:</label>
            <input
              type="text"
              id="RCNo"
              name="RCNo"
              placeholder="RCNo"
              value={RCNo}
              onChange={(e) => setRCNo(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="year">Year of Manufacture:</label>
            <input
              type="number"
              id="year"
              name="year"
              placeholder="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="rcPhoto">RC Photo:</label>
            <input
              type="file"
              id="rcPhoto"
              name="rcPhoto"
              accept="image/*"
              onChange={(e) => setRcPhoto(e.target.files[0])}
            />
          </div>
          <div className="form-group">
            <label htmlFor="truckPhotos">Truck Photos:</label>
            <input
              type="file"
              id="truckPhotos"
              name="truckPhotos"
              accept="image/*"
              multiple
              onChange={(e) => setTruckPhotos(Array.from(e.target.files))}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Trucks;
