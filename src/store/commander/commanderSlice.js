import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  commanders: null,
  commanderDetail: null,
};

export const commanderSlice = createSlice({
  name: "commander",
  initialState,
  reducers: {
    storeCommanders(state, action) {
      state.commanders = action.payload;
    },
    storeSingleCommander(state, action) {
      state.commanderDetail = action.payload;
    },
    clearCommanderDetail(state,action){
      state.commanderDetail = null;
    }
  },
});

export const { storeCommanders, storeSingleCommander, clearCommanderDetail } = commanderSlice.actions;
export default commanderSlice.reducer;
