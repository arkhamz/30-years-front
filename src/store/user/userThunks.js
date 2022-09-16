import { LOGIN, LOGOUT, UPDATE_PROGRESS } from "./userSlice";
import axios from "axios";
// import { auth } from "../../firebase/config"
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
} from "firebase/auth";
import { clearBattles } from "../battle/battleSlice";
import { showMessage } from "../appState/appStateThunks";
import { fetchProgress } from "../battle/battleThunks";
import { API_URL } from "../../config";

const auth = getAuth();

export function signup(email, password, username, navigator) {
  // had bug earlier, logging params before sending to firebase helped me see that the values were incorrect
  // console.log(email,password,username);
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
      const user = response.user;
      const userToken = user.accessToken;
      //update firebase user's displayName property to match username param
      await updateProfile(user, { displayName: username });
      console.log("firebase user", user);
      // create userOBj with email, displayName, uid from firebase to store in redux
      const newUser = {
        email: user.email,
        displayName: user.displayName,
        uid: user.uid,
      };
      //newUser and token will be stored in redux state

      //CREATE SEQUELIZE USER - {id (auto),displayName, email,uid}
      const dbresponse = await axios.post(`${API_URL}/users/new`, {
        displayName: username,
        email: email,
        uid: user.uid,
      });
      console.log("db user", dbresponse.data);
      // endpoint returns database user's id
      const { userId } = dbresponse.data;
      if (!userId) {
        throw new Error("No user ID returned from db user creation");
      }

      // CREATE SEQUELIZE USERPROGRESS record FOR USER
      const progressResponse = await axios.post(
        `${API_URL}/progress/new`,
        {
          // userId: userId, replaced this with uid as unlockNext thunk can't get userid
          uid: user.uid,
          battleId: 1,
        }
      );
      console.log("post request to create sequelize record");

      // if new user created in database and new unlock, update redux state with token
      if (dbresponse && progressResponse) {
        // localStorage.setItem("userToken", userToken);
        await dispatch(LOGIN({ newUser, userToken }));
        // set progress to 1, this will be overwritten to 1 when fetch happens
        // dispatch(UPDATE_PROGRESS(1));
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
      console.log(response);
      console.log(user);
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
      navigator("/atlas");
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
