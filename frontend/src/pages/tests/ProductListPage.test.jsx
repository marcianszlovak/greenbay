import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import ProductListPage from '../ProductListPage';
import store from '../../store';

describe('ProductListPage Component', () => {
  const MockProductListPage = (
    <MemoryRouter>
      <Provider store={store}>
        <ProductListPage match={{ params: { id: 1 } }} />
      </Provider>
    </MemoryRouter>
  );

  it('should match the snapshot', () => {
    const tree = renderer.create(MockProductListPage).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
