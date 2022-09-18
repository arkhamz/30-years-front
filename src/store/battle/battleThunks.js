import axios from "axios";
import { selectUser,selectToken } from "../user/userSelectors";
import { UPDATE_PROGRESS } from "../user/userSlice";
import { storeBattles, storeSingleBattle } from "./battleSlice";
import { LOADING_START, LOADING_DONE } from "../appState/appStateSlice";
import { API_URL } from "../../config";

//uses userID as params, gets user in front end and uses that returned value to make another request
// export function fetchBattles() {
//   return async function (dispatch, getState) {
//     try {
//       dispatch(LOADING_START());

//       // get logged in user
//       const user = selectUser(getState());
//       const token = selectToken(getState());

//       if (!user || !token) return;
//       // fetch database user
//       const uid = user.uid;
//       const userResponse = await axios.get(
//         `${API_URL}/users/${uid}`
//       );
//       const dbUser = userResponse.data;
//       if (!dbUser) return; 
//       //fetch battles based on user progress
//       const userId = dbUser.id;
//       const battleResponse = await axios.get(
//         `${API_URL}/progress/${userId}/battles`,
//         {
//           headers: {Authorization: `Bearer ${token}`}
//         }
//       );
//       const { battlesArr, progress } = battleResponse.data;
//       console.log(battlesArr);
//       if (!battlesArr || battlesArr.length < 1) return;
//       console.log(battlesArr);

//       // store battlesArr in state and update state progress
//       dispatch(storeBattles(battlesArr));
//       dispatch(LOADING_DONE());
//       dispatch(UPDATE_PROGRESS(progress));
//     } catch (e) {
//       dispatch(LOADING_DONE());
//       console.log(e);
//       console.log(e.message);
//     }
//   };
// }

export function fetchBattles() {
  return async function (dispatch, getState) {
    try {
      dispatch(LOADING_START());

      // get logged in user
      const user = selectUser(getState());
      const token = selectToken(getState());

      if (!user || !token) return;
      const uid = user.uid;
     
      const battleResponse = await axios.get(
        `${API_URL}/progress/${uid}/battles`,
        {
          headers: {Authorization: `Bearer ${token}`}
        }
      );
      const { battlesArr, progress } = battleResponse.data;
      console.log(battlesArr);
      if (!battlesArr || battlesArr.length < 1) return;
      console.log(battlesArr);

      // store battlesArr in state and update state progress
      dispatch(storeBattles(battlesArr));
      dispatch(LOADING_DONE());
      dispatch(UPDATE_PROGRESS(progress));
    } catch (e) {
      dispatch(LOADING_DONE());
      console.log(e);
      console.log(e.message);
    }
  };
}

export function fetchOneBattle(id) {
  return async function (dispatch, getState) {
    dispatch(LOADING_START());
    try {
      //GET REQUEST /battles/:id

      const token = selectToken(getState());

      if(!token) return;

      const response = await axios.get(`${API_URL}/battles/${id}`,
      {
        headers: {Authorization: `Bearer ${token}`}
      });
      const battle = response.data;
      dispatch(storeSingleBattle(battle));
      dispatch(LOADING_DONE());
    } catch (e) {
      dispatch(LOADING_DONE());
      console.log(e);
      console.log(e.message);
    }
  };
}

export function fetchProgress() {
  return async function (dispatch, getState) {
    try {
      // get logged in user
      const user = selectUser(getState());
      const token = selectToken(getState());

      if (!user || !token) return;
      // fetch database user
      const uid = user.uid;
      const userResponse = await axios.get(
        `${API_URL}/users/${uid}`
      );
      const dbUser = userResponse.data;
      if (!dbUser) return;
      //fetch battles based on user progress
      const userId = dbUser.id;
      const battleResponse = await axios.get(
        `${API_URL}/progress/${uid}/battles`,
        {
          headers: {Authorization: `Bearer ${token}`}
        }
      );
      const { progress } = battleResponse.data;
      if (!progress) return;
      // store battlesArr in state and update state progress
      dispatch(UPDATE_PROGRESS(progress));
    } catch (e) {
      console.log(e);
      console.log(e.message);
    }
  };
}

export function unlockNext(battleId, uid) {
  return async function (dispatch, getState) {
    try {
      // if on last battle, battleId of 12, prevent trying to unlock the next battle.
      //no battle with id of 13 exists

      if (battleId === "12" || battleId === 12) {
        return;
      }

      const token = selectToken(getState());

      if(!token) return;

      //unlock next one
      const response = await axios.post(`${API_URL}/progress/new`, {
        battleId: Number(battleId) + 1,
        uid,
      }, {
        headers: {Authorization: `Bearer ${token}`}
      });
      const msg = response.data;
      if (!msg) throw new Error("Unlock error");
    } catch (e) {
      console.log(e);
      console.log(e.message);
    }
  };
}
