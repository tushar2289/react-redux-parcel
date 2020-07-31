import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

export default Enzyme.configure({
  adapter: new EnzymeAdapter(),
  disableLifecycleMethods: true,
});

global.console = {
  error: jest.fn(), // console.error are ignored in tests

  // Keep native behaviour for other methods, use those to print out things in your own tests, not `console.error`
  log: console.log,
  warn: console.warn,
  info: console.info,
  debug: console.debug,
};

global.google = {
  maps: {
    Animation: {
      DROP: 'DROP',
    },
    LatLng: jest.fn(),
    places: {
      RankBy: {
        DISTANCE: 'DISTANCE',
      },
      PlacesService: jest.fn().mockImplementation(() => ({
        nearbySearch(req, callback) {
          callback([
            {
              geometry: {
                location: {
                  lat: jest.fn(),
                  lng: jest.fn(),
                },
              },
              name: 'Mumbai',
              icon: 'icon',
              id: 'id',
              rating: 5,
              types: ['restaurant'],
              user_ratings_total: 666,
            },
          ]);
        },
      })),
    },
    Origin: jest.fn().mockImplementation(() => {}),
    Point: jest.fn().mockImplementation(() => {}),
    Size: jest.fn().mockImplementation(() => {}),
  },
};
