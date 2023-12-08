import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Trucklisting } from '../actions';
import './styles/truckListing.css';

const ListingPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Trucklisting());
  }, []);

  const { trucksList } = useSelector((e) => e.functionReducer);
  console.log('trucksList', trucksList);
  return (
    <div className="listing-page">
      <h1>Trucks</h1>
      <div className="product-list">
        {trucksList.map((product) => (
          <div key={product.id} className="product">
            <img
              src={`http://localhost:4000${JSON.parse(product.truckPhoto)}`}
              alt={product.brand}
            />
            <div className="product-details">
              <h2>{product.brand}</h2>
              <p className="product-description">{product.model}</p>
              <p className="product-price">{product.variant}</p>
              <button className="product-button">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingPage;
