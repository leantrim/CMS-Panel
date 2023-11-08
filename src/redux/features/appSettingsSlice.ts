import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type appSettings = {
  darkMode: boolean;
};

const initialState: appSettings = {
  darkMode: false,
};

const appSettingsSlice = createSlice({
  name: 'webData',
  initialState,
  reducers: {
    enableDarkMode: (state) => {
      state.darkMode = true;
    },
    disableDarkMode: (state) => {
      state.darkMode = false;
    },
  },
});

export const { enableDarkMode, disableDarkMode } = appSettingsSlice.actions;

export default appSettingsSlice.reducer;
