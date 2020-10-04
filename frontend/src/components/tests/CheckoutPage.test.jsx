import React from 'react';
import renderer from 'react-test-renderer';

import CheckoutPage from '../CheckoutPage';

it('should render correctly', () => {
  const tree = renderer.create(<CheckoutPage />).toJSON();
  expect(tree).toMatchSnapshot();
});
