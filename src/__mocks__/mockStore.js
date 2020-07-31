import { configureStore } from '@reduxjs/toolkit';

import rootReducer from '../rootReducer';
import { readPlacesFromMock } from '../utils';
import { initialState as placeTypeInitialState } from '../features/filters/placeTypeSlice';

const options = {
  reducer: rootReducer,
  preloadedState: {
    placeTypes: placeTypeInitialState,
    places: { places: readPlacesFromMock() },
    theme: {
      theme: 'dark',
    },
    currentLocation: {
      lat: 0,
      lng: 0,
    },
  },
};

const store = configureStore(options);

export default store;
