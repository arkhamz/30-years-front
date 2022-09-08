import axios from "axios";
//action creators
import { storeCommanders, storeSingleCommander } from "./commanderSlice";

export function fetchCommanders() {
  return async function (dispatch, getState) {
    try {
      //GET request /commanders
      const response = await axios.get(`http://localhost:4000/commanders`);
      console.log(response);
      const commandersArr = response.data;
      //update redux store with the commanders array
      dispatch(storeCommanders(commandersArr));
    } catch (e) {
      console.log(e);
      console.log(e.message);
    }
  };
}

export function fetchOneCommander(id) {
  return async function (dispatch, getState) {
    try {
      //GET request /commanders
      const response = await axios.get(
        `http://localhost:4000/commanders/${id}`
      );
      const commander = response.data;
      //update redux store with commanders detail
      dispatch(storeSingleCommander(commander));
    } catch (e) {
      console.log(e);
      console.log(e.message);
    }
  };
}
