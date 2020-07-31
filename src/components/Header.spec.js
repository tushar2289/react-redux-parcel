import React from 'react';
import { Provider } from 'react-redux';
import { createMount } from '@material-ui/core/test-utils';
import store from '../__mocks__/mockStore';
import Header from './Header';

describe('App component', () => {
  let shallow, wrapper;
  beforeEach(() => {
    shallow = createMount();
    wrapper = shallow(
      <Provider store={store}>
        <Header />
      </Provider>
    );
  });

  afterEach(() => {
    shallow = null;
    wrapper = null;
  });

  it('should render properly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should not update location of user since geo location isnt mocked', () => {
    const button = wrapper.find('[data-testid="get_location_button"]');
    button.first().simulate('click');
    expect(store.getState().currentLocation).toMatchSnapshot();
  });

  it('should update location', () => {
    const mockGeolocation = {
      getCurrentPosition: jest.fn().mockImplementation((callback) => {
        const position = {
          coords: {
            latitude: 10,
            longitude: 10,
          },
        };
        callback(position);
      }),
      watchPosition: jest.fn(),
    };

    global.navigator.geolocation = mockGeolocation;

    const button = wrapper.find('[data-testid="get_location_button"]');
    button.first().simulate('click');
    expect(store.getState().currentLocation).toMatchSnapshot();
  });
});
