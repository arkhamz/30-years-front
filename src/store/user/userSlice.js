import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  authCheck: false,
  progress: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LOGIN(state, action) {
        //this will also be used for signup, since firebase auth signup
        ///will auto log in
        const {newUser, userToken} = action.payload
      state.user = newUser;
      state.token = userToken;
    },
    LOGOUT(state,action){
        //set state.user to null
        state.user = null;
        state.token = null;
        state.authCheck = false;
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
