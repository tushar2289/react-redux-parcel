import { createSlice } from '@reduxjs/toolkit';
import {
  RESTAURANT,
  HOSPITAL,
  BANK,
  ATM,
  AIRPORT,
  TRAIN_STATION,
  SUPERMARKET,
  GAS_STATION,
  SHOPPING_MALL,
} from '../../constants/mapPlaceTypes';

export const initialState = {
  restaurant: {
    type: RESTAURANT,
    label: 'Restaurant',
    isOn: true,
  },
  bank: {
    type: BANK,
    label: 'Bank',
    isOn: false,
  },
  hospital: {
    type: HOSPITAL,
    label: 'Hospital',
    isOn: false,
  },
  atm: {
    type: ATM,
    label: 'ATM',
    isOn: false,
  },
  airport: {
    type: AIRPORT,
    label: 'Airport',
    isOn: false,
  },
  train_station: {
    type: TRAIN_STATION,
    label: 'Train station',
    isOn: false,
  },
  supermarket: {
    type: SUPERMARKET,
    label: 'Supermarket',
    isOn: false,
  },
  gas_station: {
    type: GAS_STATION,
    label: 'Fuel pump',
    isOn: false,
  },
  shopping_mall: {
    type: SHOPPING_MALL,
    label: 'Mall',
    isOn: false,
  },
};

const filtersSlice = createSlice({
  name: 'placeTypeFilter',
  initialState,
  reducers: {
    enablePlaceType(state, { payload }) {
      const { type, value } = payload;
      state[type].isOn = value;
    },
    resetPlaceType() {
      return initialState;
    },
  },
});

export const { enablePlaceType, resetPlaceType } = filtersSlice.actions;

export default filtersSlice.reducer;

export const getPlaceTypes = (state) => state.placeTypes;
