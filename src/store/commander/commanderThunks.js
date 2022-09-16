import axios from "axios";
//action creators
import { storeCommanders, storeSingleCommander } from "./commanderSlice";
import { LOADING_START, LOADING_DONE } from "../appState/appStateSlice";
import { API_URL } from "../../config";

export function fetchCommanders() {
  return async function (dispatch, getState) {
    try {
      dispatch(LOADING_START());
      //GET request /commanders
      const response = await axios.get(`${API_URL}/commanders`);
      const commandersArr = response.data;
      //update redux store with the commanders array
      dispatch(storeCommanders(commandersArr));
      dispatch(LOADING_DONE());
    } catch (e) {
      dispatch(LOADING_DONE());
      console.log(e);
      console.log(e.message);
    }
  };
}

export function fetchOneCommander(id) {
  return async function (dispatch, getState) {
    try {
      dispatch(LOADING_START());
      //GET request /commanders
      const response = await axios.get(
        `${API_URL}/commanders/${id}`
      );
      const commander = response.data;

      
      //update redux store with commanders detail
      dispatch(storeSingleCommander(commander));
      dispatch(LOADING_DONE());
    } catch (e) {
      dispatch(LOADING_DONE());
   
      console.log(e);
      console.log(e.message);
    }
  };
}
