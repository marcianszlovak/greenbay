import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import HomePage from '../HomePage';
import store from '../../store';

describe('HomePage Component', () => {
  const MockHomePage = (
    <MemoryRouter>
      <Provider store={store}>
        <HomePage
          match={{
            params: {
              keyword: 'goat',
              pageNumber: 5,
            },
          }}
        />
      </Provider>
    </MemoryRouter>
  );

  it('should match the snapshot', () => {
    const tree = renderer.create(MockHomePage).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
