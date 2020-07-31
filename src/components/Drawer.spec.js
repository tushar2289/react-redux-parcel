import React from 'react';
import { Provider } from 'react-redux';
import { createShallow } from '@material-ui/core/test-utils';
import Drawer from './Drawer';
import store from '../__mocks__/mockStore';

describe('Drawer component', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow();
  });

  it('should render properly', () => {
    const render = shallow(
      <Provider store={store}>
        <Drawer />
      </Provider>
    );
    expect(render.html()).toMatchSnapshot();
  });
});
