import { configureStore } from "@reduxjs/toolkit";
import battleReducer from "./battle/battleSlice";
import commanderReducer from "./commander/commanderSlice";
import userReducer from "./user/userSlice"
import appStateReducer from "./appState/appStateSlice";

const store = configureStore({
  reducer: {
    battle: battleReducer,
    commander: commanderReducer,
    user: userReducer,
    appState: appStateReducer
  },
});

export default store;
