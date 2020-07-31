import currentLocationReducer, { setCurrentLocation } from './slice';

describe('Current location reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = currentLocationReducer(undefined, {});
  });

  it('should return initial state', () => {
    expect(initialState).toMatchSnapshot();
  });

  it('should set theme', () => {
    expect(
      currentLocationReducer(initialState, {
        type: setCurrentLocation.type,
        payload: {
          lat: 100,
          lng: 100,
        },
      })
    ).toMatchSnapshot();
  });
});
