import axios from "axios";
import { selectUser } from "../user/userSelectors";
import { UPDATE_PROGRESS } from "../user/userSlice";
import { storeBattles, storeSingleBattle } from "./battleSlice";
import { LOADING_START, LOADING_DONE } from "../appState/appStateSlice";


export function fetchBattles() {
  return async function (dispatch, getState) {
    try {

      // USER IN STATE HAS UID = ID

      // get logged in user
      const user = selectUser(getState());

      if(!user) return;
      // fetch database user
      const uid = user.uid;
      const userResponse = await axios.get(`http://localhost:4000/users/${uid}`);
      const dbUser = userResponse.data;
      if(!dbUser) return;
      //fetch battles based on user progress
      const userId = dbUser.id;
      const battleResponse = await axios.get(`http://localhost:4000/progress/${userId}/battles`);
      const {battlesArr,progress} = battleResponse.data;
      if(!battlesArr || battlesArr.length < 1) return;
      
      // store battlesArr in state and update state progress
      dispatch(storeBattles(battlesArr));
      dispatch(UPDATE_PROGRESS(progress))
    } catch (e) {
      console.log(e);
      console.log(e.message);
    }
  };
}

// //get all battles 
// export function fetchBattles() {
//   return async function (dispatch, getState) {
//     try {
//       //DO GET REQUEST /battles
//       const response = await axios.get(`http://localhost:4000/battles`);
//       const battlesArr = response.data;
//       dispatch(storeBattles(battlesArr));
//     } catch (e) {
//       console.log(e);
//       console.log(e.message);
//     }
//   };
// }

export function fetchOneBattle(id) {
  return async function (dispatch, getState) {
    dispatch(LOADING_START())
    try {
      //GET REQUEST /battles/:id
      const response = await axios.get(`http://localhost:4000/battles/${id}`);
      const battle = response.data;
      dispatch(storeSingleBattle(battle));
      dispatch(LOADING_DONE());
    } catch (e) {
      dispatch(LOADING_DONE())
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

      if(!user) return;
      // fetch database user
      const uid = user.uid;
      const userResponse = await axios.get(`http://localhost:4000/users/${uid}`);
      const dbUser = userResponse.data;
      if(!dbUser) return;
      //fetch battles based on user progress
      const userId = dbUser.id;
      const battleResponse = await axios.get(`http://localhost:4000/progress/${userId}/battles`);
      const {progress} = battleResponse.data;
      if(!progress) return
      // store battlesArr in state and update state progress
      dispatch(UPDATE_PROGRESS(progress))
    } catch (e) {
      console.log(e);
      console.log(e.message);
    }
  };
}

export function unlockNext(battleId,uid) {
  return async function (dispatch, getState) {
    try {

      // if on last battle, battleId of 12, prevent trying to unlock the next battle.
      //no battle with id of 13 exists


      if(battleId === "12" || battleId === 12) {
        return
      }

      //unlock next one
      const response = await axios.post(`http://localhost:4000/progress/new`, {
        battleId: Number(battleId) + 1,
        uid
      });
      const msg = response.data;
      if(!msg)throw new Error("Unlock error")
    } catch (e) {
      console.log(e);
      console.log(e.message);
    }
  };
}