import { createSlice } from "@reduxjs/toolkit";

import { rootColors } from "@/styles/styles";

const initialState = {
  isDarkMode: false,
  colors: {
    primarybg: rootColors.primarybg,
    primarybtn: rootColors.primarybtn,
    errorColor: rootColors.errorColor,
  },
  cachedLocation: {
    latitude: 0,
    longitude: 0,
    city: "",
    weather: {},
  },
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.isDarkMode = !state.isDarkMode;

      // Update colors based on the theme
      if (!state.isDarkMode) {
        state.colors = {
          primarybg: "#1D71F2",
          primarybtn: "#DDB130",
          errorColor: "#121212",
        };
      } else {
        state.colors = {
          primarybg: "#121212",
          primarybtn: "#fafafa",
          errorColor: "red",
        };
      }
    },
    setLocation(state, action) {
      // Update the cached location with new data
      state.cachedLocation = {
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
        city: action.payload.city,
        weather: action.payload.weather,
      };
    },
    clearLocation(state) {
      // Reset the cached location to initial values
      state.cachedLocation = {
        latitude: 0,
        longitude: 0,
        city: "",
        weather: {},
      };
    },
  },
});

export const { toggleTheme, setLocation, clearLocation } = themeSlice.actions;

export default themeSlice.reducer;
