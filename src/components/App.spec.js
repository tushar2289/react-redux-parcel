import React from 'react';
import { Provider } from 'react-redux';
import { createShallow } from '@material-ui/core/test-utils';
import App from './App';
import store from '../__mocks__/mockStore';

describe('App component', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow();
  });

  it('should render properly', () => {
    const render = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(render.html()).toMatchSnapshot();
  });
});
