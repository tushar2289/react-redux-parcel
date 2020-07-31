import placesReducer, {
  getPlacesStart,
  getPlacesSuccess,
  getPlacesFailure,
  resetPlaces,
  setSelectedPlace,
  setSelectedNone,
  removePlaces,
  fetchPlaces,
} from './slice';
import { readPlacesFromMock } from '../../utils';
import * as mapsApi from '../../api/mapsAPI';
import store from '../../store';

const setPlacesInStore = (initialState) => {
  const results = readPlacesFromMock();
  const action = {
    type: getPlacesSuccess.type,
    payload: { places: results },
  };
  return placesReducer(initialState, action);
};

const setSelectedPlaceInStore = (initialState) => {
  const results = readPlacesFromMock();
  const action = {
    type: setSelectedPlace.type,
    payload: results[0],
  };
  return placesReducer(initialState, action);
};

describe('Photos reducer', () => {
  it('should return initial state', () => {
    expect(placesReducer(undefined, {})).toMatchSnapshot();
  });

  it('should set loading', () => {
    const action = {
      type: getPlacesStart.type,
    };
    expect(placesReducer(undefined, action)).toMatchSnapshot();
  });

  it('should set error', () => {
    const action = {
      type: getPlacesFailure.type,
      payload: {
        error: {},
      },
    };
    expect(placesReducer(undefined, action)).toMatchSnapshot();
  });

  it('should set places', () => {
    expect(setPlacesInStore()).toMatchSnapshot();
  });

  it('should reset state', () => {
    const action = {
      type: resetPlaces.type,
    };
    expect(placesReducer(undefined, action)).toMatchSnapshot();
  });

  it('should set selected place', () => {
    const state = setPlacesInStore();
    expect(setSelectedPlaceInStore(state)).toMatchSnapshot();
  });

  it('should clear all selected', () => {
    const state1 = setPlacesInStore();
    const state2 = setSelectedPlaceInStore(state1);
    const action = {
      type: setSelectedNone.type,
    };
    expect(placesReducer(state2, action)).toMatchSnapshot();
  });

  it('should remove all places', () => {
    const state = setPlacesInStore();
    const action = {
      type: removePlaces.type,
    };
    expect(placesReducer(state, action)).toMatchSnapshot();
  });

  it('should fetch all places and update in state', async () => {
    jest
      .spyOn(mapsApi, 'getNearbyPlaces')
      .mockImplementation(() => Promise.resolve(readPlacesFromMock()));
    await store.dispatch(fetchPlaces('restaurant', { lat: 0, lng: 0 }, {}));
    expect(store.getState()).toMatchSnapshot();
  });
});
