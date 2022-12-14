import { LOGIN, LOGOUT, UPDATE_PROGRESS } from "./userSlice";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  updateProfile
} from "firebase/auth";
import { clearBattles } from "../battle/battleSlice";
import { showMessage } from "../appState/appStateThunks";
import { fetchProgress } from "../battle/battleThunks";
import { API_URL } from "../../config";

const auth = getAuth();

export function signup(email, password, username, navigator) {
  // had bug earlier, logging params before sending to firebase helped me see that the values were incorrect
  return async function (dispatch, getState) {
    try {
      //CREATE USER ON FIREBASE AUTH
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // user is immediately logged in if sucessfully created
      if (!response) {
        throw new Error("Could not complete signup");
      }
      const firebaseUser = response.user;
      const userToken = firebaseUser.accessToken;
      if(!userToken) return;
      // //update firebase user's displayName property to match username param
      await updateProfile(firebaseUser, { displayName: username });

      // create userObj to store in redux state w
      const newUser = {
        email: firebaseUser.email,
        displayName: username,
        uid: firebaseUser.uid,
      };

      // Create new user and a progress of level 1 for them
      const dbresponse = await axios.post(`${API_URL}/users/new`, {
        displayName: username,
        email: email,
        uid: firebaseUser.uid,
      });

      if (!dbresponse || !dbresponse.data) {
        throw new Error("Error during new user creation");
      }

      // if new user created in database and new unlock, update redux state with token
      if (dbresponse && dbresponse.data) {
        // localStorage.setItem("userToken", userToken);
        dispatch(LOGIN({ newUser, userToken }));
        // set progress to 1, this will be overwritten  1 when ATLAS FETCH happens
        dispatch(UPDATE_PROGRESS(1));
      }

    } catch (e) {
      console.log(e);
      console.log(e.message);
      dispatch(showMessage("An error occured during signup, please try again later"));
    }
  };
}

export function login(email, password, navigator) {
  return async function (dispatch, getState) {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const user = response.user;
      const userToken = user.accessToken;

      const newUser = {
        email: user.email,
        displayName: user.displayName,
        uid: user.uid,
      };
      dispatch(LOGIN({ newUser, userToken }));
      // call dispatch fetchProgress to get the user's progress immediately and not wait until atlas to do it
      // Will get user's new progress and set it to state, overriding LOGIN case reducer's progress = 1 this
      //progress is updated at login, instead of when atlast page is loaded, which would happen of we didn't fetch it now
      //we're dispatching a thunk inside a thunk
      dispatch(fetchProgress());
      // localStorage.setItem("userToken", userToken);
      // navigator("/atlas");
    } catch (e) {
      console.log(e);
      console.log(e.message);
      dispatch(showMessage("Invalid email address or password"));
    }
  };
}

export function logout() {
  return async function (dispatch, getState) {
    try {
      await signOut(auth);
      dispatch(clearBattles());
      dispatch(LOGOUT());
    } catch (e) {
      console.log(e);
      console.log(e.message);
    }
  };
}
