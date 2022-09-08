import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCommanders } from "../store/commander/commanderThunks";
import { selectCommanders } from "../store/commander/commanderSelectors";

function Commanders() {
  const dispatch = useDispatch();
  const commanders = useSelector(selectCommanders);

  useEffect(
    function () {
      //dispatch thunk that fetches commanders
      dispatch(fetchCommanders());
    },
    [dispatch]
  );

  //TODO - loop through the commanders array and display basic commander info

  return (
    <div>
      <ul className="commander-list">
        {commanders && commanders.map(function (item, index, arr) {})}
      </ul>
    </div>
  );
}

export default Commanders;
