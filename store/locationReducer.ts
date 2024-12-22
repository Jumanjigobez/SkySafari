import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  cachedLocation: {
    latitude: 0,
    longitude: 0,
    city: "",
    weather: {},
  },
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    updateCachedLocation(state, action) {
      state.cachedLocation = action.payload;
    },
  },
});

export const { updateCachedLocation } = locationSlice.actions;

export default locationSlice.reducer;
