import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  authCheck: false,
  progress: 1,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LOGIN(state, action) {
        //this will also be used for signup, firebase auth signup auto logs in
        const {newUser, userToken} = action.payload
        state.token = userToken;
        state.user = newUser;
        state.progress = 1;
    },
    LOGOUT(state,action){
        state.token = null;
        state.user = null;
        // state.authCheck = false;
        state.progress = null;
      
    },
    AUTH_IS_READY(state, action) {
      const {newUser, userToken} = action.payload
      state.authCheck = true;
      state.user = newUser;
      state.token = userToken;
    },
    UPDATE_PROGRESS(state,action){
      state.progress = action.payload;
    },
  },
});

export const { LOGIN, AUTH_IS_READY, LOGOUT, UPDATE_PROGRESS, } = userSlice.actions;
export default userSlice.reducer;
