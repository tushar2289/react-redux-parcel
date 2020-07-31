import React from 'react';
import { Provider } from 'react-redux';
import { createShallow } from '@material-ui/core/test-utils';
import store from '../__mocks__/mockStore';
import ListView from './ListView';

describe('App component', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow();
  });

  it('should render properly', () => {
    const render = shallow(
      <Provider store={store}>
        <ListView />
      </Provider>
    );
    expect(render.html()).toMatchSnapshot();
  });
});
