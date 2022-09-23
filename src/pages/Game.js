import { useSelector, useDispatch } from "react-redux";
import { fetchCommanders } from "../store/commander/commanderThunks";
import { useState,useEffect } from "react";
import { selectCommanders } from "../store/commander/commanderSelectors";

function Game(){

    const dispatch = useDispatch();
    const commanders = useSelector(selectCommanders);

  useEffect(
    function () {
      //dispatch thunk that fetches commanders
      dispatch(fetchCommanders());
    },
    [dispatch]
  );

  return()
}

export default Game;