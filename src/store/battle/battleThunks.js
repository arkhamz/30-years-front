import axios from "axios";
import { storeBattles, storeSingleBattle } from "./battleSlice";

export function fetchBattles() {
  return async function (dispatch, getState) {
    try {
      //DO GET REQUEST /battles
      const response = await axios.get(`http://localhost:4000/battles`);
      const battlesArr = response.data;
      dispatch(storeBattles(battlesArr));
      console.log(battlesArr);
    } catch (e) {
      console.log(e);
      console.log(e.message);
    }
  };
}

export function fetchOneBattle(id) {
  return async function (dispatch, getState) {
    try {
      //GET REQUEST /battles/:id
      const response = await axios.get(`http://localhost:4000/battles${id}`);
      const battle = response.data;
    } catch (e) {
      console.log(e);
      console.log(e.message);
    }
  };
}
