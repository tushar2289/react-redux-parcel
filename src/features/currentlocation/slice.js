import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  lat: window.localStorage.getItem('lat')
    ? parseFloat(window.localStorage.getItem('lat'))
    : 19.170078,
  lng: window.localStorage.getItem('lng')
    ? parseFloat(window.localStorage.getItem('lng'))
    : 72.860186,
};

const currentLocationSlice = createSlice({
  name: 'currentLocation',
  initialState,
  reducers: {
    setCurrentLocation(state, action) {
      const { lat, lng } = action.payload;
      state.lat = lat;
      state.lng = lng;
      window.localStorage.setItem('lat', lat);
      window.localStorage.setItem('lng', lng);
    },
  },
});

export const { setCurrentLocation } = currentLocationSlice.actions;

export default currentLocationSlice.reducer;

export const getCurrentLocation = (state) => state.currentLocation;
