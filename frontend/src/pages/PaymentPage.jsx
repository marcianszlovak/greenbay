import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutPage from '../components/CheckoutPage';
import { savePaymentMethod } from '../redux/actions/cartActions';

const PaymentPage = ({ history, initialValues, onSubmit }) => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayGreen');

  const dispatch = useDispatch();

  const submitHandler = e => {
    if (e) e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutPage step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Select Method</Form.Label>
          <Form.Check
            type="radio"
            label="PayGreen"
            checked={paymentMethod === 'PayGreen'}
            value="PayGreen"
            onChange={e => setPaymentMethod(e.target.value)}
          />
          <Form.Check
            type="radio"
            label="FoxCard"
            checked={paymentMethod === 'FoxCard'}
            value="FoxCard"
            onChange={e => setPaymentMethod(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="success">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
