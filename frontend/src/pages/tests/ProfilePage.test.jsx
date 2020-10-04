import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import ProfilePage from '../ProfilePage';
import store from '../../store';

describe('ProfilePage Component', () => {
  const MockProfilePage = (
    <MemoryRouter>
      <Provider store={store}>
        <ProfilePage />
      </Provider>
    </MemoryRouter>
  );

  it('should match the snapshot', () => {
    const tree = renderer.create(MockProfilePage).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
