import { configureStore } from "@reduxjs/toolkit";
import battleReducer from "./battle/battleSlice";
import commanderReducer from "./commander/commanderSlice";
import userReducer from "./user/userSlice"

const store = configureStore({
  reducer: {
    battle: battleReducer,
    commander: commanderReducer,
    user: userReducer
  },
});

export default store;
