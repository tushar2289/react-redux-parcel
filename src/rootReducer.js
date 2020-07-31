import { combineReducers } from '@reduxjs/toolkit';
import placeTypeReducer from './features/filters/placeTypeSlice';
import placesReducer from './features/places/slice';
import themeReducer from './features/themeselector/slice';
import currentLocationReducer from './features/currentlocation/slice';

const rootReducer = combineReducers({
  placeTypes: placeTypeReducer,
  places: placesReducer,
  theme: themeReducer,
  currentLocation: currentLocationReducer,
});

export default rootReducer;
