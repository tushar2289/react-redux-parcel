import { createSlice } from '@reduxjs/toolkit';

import { getNearbyPlaces } from '../../api/mapsAPI';

const initialState = {
  places: [],
  isLoading: false,
  error: null,
};

const places = createSlice({
  name: 'places',
  initialState,
  reducers: {
    getPlacesStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    getPlacesSuccess(state, action) {
      const { places } = action.payload;
      places.forEach((place) => state.places.unshift(place));
      state.isLoading = false;
      state.error = null;
    },
    getPlacesFailure(state, action) {
      const { error } = action.payload;
      state.isLoading = false;
      state.error = error;
    },
    removePlaces(state, action) {
      state.places = state.places.filter(
        (place) => place.types.indexOf(action.payload) === -1
      );
    },
    setSelectedPlace(state, action) {
      state.places.forEach((place) => (place.selected = false));
      const place = state.places.find(
        (place) => place.id === action.payload.id
      );
      place.selected = !place.selected;
    },
    setSelectedNone(state) {
      state.places.forEach((place) => (place.selected = false));
    },
    resetPlaces() {
      return initialState;
    },
    resetError(state) {
      state.error = null;
    },
  },
});

export const {
  getPlacesStart,
  getPlacesSuccess,
  getPlacesFailure,
  enablePlaceType,
  removePlaces,
  setSelectedPlace,
  setSelectedNone,
  resetPlaces,
  resetError,
} = places.actions;
export default places.reducer;

export const fetchPlaces = (type, center, map) => async (dispatch) => {
  try {
    dispatch(getPlacesStart());
    const places = await getNearbyPlaces(type, center, map);
    if (places.length) {
      dispatch(getPlacesSuccess({ places }));
    } else {
      dispatch(getPlacesFailure({ error: 'No places found' }));
    }
  } catch (err) {
    dispatch(getPlacesFailure({ error: err }));
  }
};

export const getPlaces = (state) => state.places;
