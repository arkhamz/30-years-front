import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  message: null,
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    LOADING: (state) => {
      state.loading = true;
    },
    LOADING_DONE: (state) => {
      state.loading = false;
    },
    SET_MESSAGE: (state, action) => {
      state.message = action.payload;
    },
    CLEAR_MESSAGE: (state, action) => {
      state.message = null;
    },
  },
});

export const { LOADING, LOADING_DONE, SET_MESSAGE, CLEAR_MESSAGE } =
  appStateSlice.actions;

export default appStateSlice.reducer;