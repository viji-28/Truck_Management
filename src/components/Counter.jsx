import React from 'react';
import '../components/styles/dashboard.css';

const Counter = ({ value, label }) => {
  return (
    <div className="counter">
      <h2 className="counter-value">{value}</h2>
      <p className="counter-label">{label}</p>
    </div>
  );
};

export default Counter;
