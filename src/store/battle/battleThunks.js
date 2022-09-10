import axios from "axios";
import { selectUser } from "../user/userSelectors";
import { UPDATE_PROGRESS } from "../user/userSlice";
import { storeBattles, storeSingleBattle } from "./battleSlice";


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



// //get all battles irrespective of user progresss
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
    try {
      //GET REQUEST /battles/:id
      const response = await axios.get(`http://localhost:4000/battles/${id}`);
      const battle = response.data;
      dispatch(storeSingleBattle(battle));
    } catch (e) {
      console.log(e);
      console.log(e.message);
    }
  };
}
