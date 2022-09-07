import { useDispatch, useSelector } from "react-redux";
import { selectOneBattle } from "../store/battle/battleSelectors";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { fetchOneBattle } from "../store/battle/battleThunks";

function BattleDetail() {
  const { id } = useParams();
  const singleBattle = useSelector(selectOneBattle);
  const dispatch = useDispatch();

  useEffect(function () {
    //dispatch thunk action to get battle
    dispatch(fetchOneBattle(id));
  }, []);

  console.log(singleBattle);

  return (
    <div>
      <h1>BattleDetail</h1>
    </div>
  );
}

export default BattleDetail;
