import themeReducer, { setTheme } from './slice';

describe('Theme selector', () => {
  let initialState;
  beforeEach(() => {
    initialState = themeReducer(undefined, {});
  });

  it('should return initial state', () => {
    expect(initialState).toMatchSnapshot();
  });

  it('should set theme', () => {
    expect(
      themeReducer(initialState, {
        type: setTheme.type,
        payload: 'dark',
      })
    ).toMatchSnapshot();
  });
});
