import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import Checkout from './checkout';

const stripeTestPromise = loadStripe(
  'pk_test_51MpRl9SJBwKM6C1lhBMnbVYfjw3FA9UjVzEuuRQtEyiRnp4xC1Im2tXvWWBIrVEh0m6WSyvrtGcJfSjzmKj7aeDU00Ci5Qmrpz'
);

const PaymentDetails = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <Checkout />
    </Elements>
  );
};

export default PaymentDetails;
