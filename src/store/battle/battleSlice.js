import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  battles: null,
  battleDetail: null,
};

export const battleSlice = createSlice({
  name: "battle",
  initialState,
  reducers: {
    storeBattles(state, action) {
      state.battles = action.payload;
    },
    storeSingleBattle(state, action) {
      state.battleDetail = action.payload;
    },
    clearBattleDetail(state,action){
      state.battleDetail = null;
    },
    clearBattles(state,action){
      state.battles = null;
    }
  },
});

export const { storeBattles, storeSingleBattle,clearBattleDetail,clearBattles } = battleSlice.actions;
export default battleSlice.reducer;
