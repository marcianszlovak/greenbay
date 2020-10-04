import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import ProductEditPage from '../ProductEditPage';
import store from '../../store';

describe('ProductEditPage Component', () => {
  const MockProductEditPage = (
    <MemoryRouter>
      <Provider store={store}>
        <ProductEditPage match={{ params: { id: 1 } }} />
      </Provider>
    </MemoryRouter>
  );

  it('should match the snapshot', () => {
    const tree = renderer.create(MockProductEditPage).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
