import placeTypesReducer, {
  enablePlaceType,
  resetPlaceType,
} from './placeTypeSlice';
import { RESTAURANT } from '../../constants/mapPlaceTypes';

describe('Place type reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = placeTypesReducer(undefined, {});
  });

  it('should return initial state', () => {
    expect(initialState).toMatchSnapshot();
  });

  it('should set and then reset all the place types', () => {
    const newState = placeTypesReducer(initialState, {
      type: enablePlaceType.type,
      payload: {
        type: RESTAURANT,
        value: true,
      },
    });
    expect(
      placeTypesReducer(newState, {
        type: resetPlaceType.type,
      })
    ).toMatchSnapshot();
  });
});
