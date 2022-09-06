import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  battles: null,
  battleDetail: null,
};

const battleSlice = createSlice({
  name: "battle",
  initialState,
  reducers: {
    storeBattles(state, action) {
      state.battles = action.payload;
    },
    storeSingleBattle(state, action) {
      state.battleDetail = action.payload;
    },
  },
});

export const {} = battleSlice.actions;
export default battleSlice.reducer;
