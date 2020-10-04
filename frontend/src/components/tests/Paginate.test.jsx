import React from 'react';
import renderer from 'react-test-renderer';

import Paginate from '../Paginate';
import { MemoryRouter } from 'react-router-dom';

it('should render correctly', () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <Paginate isAdmin={false} keyword={''} page={3} pages={6} />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
