import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface Location {
  lat: number;
  lng: number;
}

interface LocationState {
  lastLocation: Location | null;
}

const initialState: LocationState = {
  lastLocation: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLastLocation: (state, action) => {
      state.lastLocation = action.payload;
    },
    clearLocation: (state) => {
      state.lastLocation = null;
    },
  },
});

export const getLastLocation = (state: RootState) =>
      state.location.lastLocation;

export const { setLastLocation, clearLocation} = locationSlice.actions;

export default locationSlice.reducer;
