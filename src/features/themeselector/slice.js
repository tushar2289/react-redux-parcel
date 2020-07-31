import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  theme: window.localStorage.getItem('theme') || null,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
      window.localStorage.setItem('theme', action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;

export const getTheme = (state) => state.theme;
