import { RESTAURANT } from '../constants/mapPlaceTypes';
import { getNearbyPlaces } from './mapsAPI';

describe('Maps API', () => {
  it('should return the places', async () => {
    const places = await getNearbyPlaces(
      RESTAURANT,
      { lat: 100, lng: 100 },
      {}
    );
    expect(places).toMatchSnapshot();
  });
});
