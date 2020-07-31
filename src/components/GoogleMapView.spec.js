import React from 'react';
import { Provider } from 'react-redux';
import { createShallow } from '@material-ui/core/test-utils';
import store from '../__mocks__/mockStore';
import GoogleMapView from './GoogleMapView';

/* Google map cannot be tested in unit tests, explained in link below
    https://github.com/JustFly1984/react-google-maps-api/issues/113 */

jest.mock('@react-google-maps/api', () => ({
  useLoadScript: () => ({
    isLoaded: true,
    loadError: false,
  }),
}));

describe('App component', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow();
  });

  it('should render properly', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <GoogleMapView />
      </Provider>
    );
    expect(wrapper.find('GoogleMapView').length).toEqual(1);
  });
});
