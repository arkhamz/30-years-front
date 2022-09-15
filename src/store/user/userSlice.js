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
        // localStorage.setItem("userToken", userToken)
        state.token = userToken;
        state.user = newUser;
        state.progress = 1;
    },
    LOGOUT(state,action){
        //set state.user to null
        // localStorage.removeItem("userToken")
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
