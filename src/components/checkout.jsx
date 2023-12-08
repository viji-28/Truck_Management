import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DriverStripe } from '../actions';
import './styles/checkout.css';
// import CryptoJS from 'crypto-js';

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');

  const handleCardNumberChange = (event) => {
    let input = event.target.value.replace(/\s/g, '');
    if (input.length > 16) {
      input = input.slice(0, 16);
    }
    input = input
      .match(/.{1,4}/g)
      .join(' ')
      .trim();
    setCardNumber(input);
  };

  const handleExpiryDateChange = (event) => {
    let input = event.target.value.replace(/\D/g, '');
    if (input.length > 4) {
      input = input.slice(0, 4);
    }
    input = input
      .match(/.{1,2}/g)
      .join('/')
      .trim();
    setExpiryDate(input);
  };

  const handleCvcChange = (event) => {
    let input = event.target.value.replace(/\D/g, '');
    if (input.length > 3) {
      input = input.slice(0, 3);
    }
    setCvc(input);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitted');
    let formData = { cardNumber, expiryDate, cvc };

    dispatch(DriverStripe(formData));
  };

  return (
    <form className="CheckoutForm" onSubmit={handleSubmit}>
      <label htmlFor="cardNumber">Card Number</label>
      <input
        type="text"
        id="cardNumber"
        name="cardNumber"
        placeholder="1234 5678 9012 3456"
        value={cardNumber}
        onChange={handleCardNumberChange}
      />
      <label htmlFor="expiryDate">Expiry Date</label>
      <input
        type="text"
        id="expiryDate"
        name="expiryDate"
        placeholder="MM/YY"
        value={expiryDate}
        onChange={handleExpiryDateChange}
      />
      <label htmlFor="cvc">CVC</label>
      <input
        type="text"
        id="cvc"
        name="cvc"
        placeholder="123"
        value={cvc}
        onChange={handleCvcChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CheckoutForm;
