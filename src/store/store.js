import { configureStore } from "@reduxjs/toolkit";
import battleReducer from "./battle/battleSlice";
import commanderReducer from "./commander/commanderSlice";

const store = configureStore({
  reducer: {
    battle: battleReducer,
    commander: commanderReducer,
  },
});

export default store;
