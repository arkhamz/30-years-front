import { useDispatch, useSelector } from "react-redux";
import { selectOneBattle } from "../store/battle/battleSelectors";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchOneBattle } from "../store/battle/battleThunks";
import { v4 as uuidv4 } from "uuid";
import "./BattleDetail.css";

function BattleDetail() {
  const { id } = useParams();
  const battle = useSelector(selectOneBattle);
  const dispatch = useDispatch();

  useEffect(function () {
    //dispatch thunk action to get battle
    dispatch(fetchOneBattle(id));
  }, []);

  //////////////////////////////////////////////////////////////////////////////

  const armyOneStrength = battle && battle.armyOne.strength;
  const armyOneCasualties = battle && battle.armyOne.casualties;
  const armyTwoStrength = battle && battle.armyTwo.strength;
  const armyTwoCasualties = battle && battle.armyTwo.casualties;
  const battlePrelude = battle && battle.prelude;
  const battleDescription = battle && battle.description;
  const battleResult = battle && battle.description;
  const battleTitle = battle && battle.name;

  return (
    <>
      {battle && (
        <div className="battle-container">
          <div className="army">
            {/* ARMY ONE */}
            <div className="beligerents">
              {battle.armyOne?.beligerents.map(function (item) {
                return (
                  <div className="beligerent" key={uuidv4()}>
                    <img className="beligerent-flag" src={item[1]} alt="" />
                    <h3>{item[0]}</h3>
                  </div>
                );
              })}
            </div>
            <div className="commanders">
              <h2>Commanders</h2>
              {/* ARMY ONE */}
              {battle.armyOne?.commanders.map(function (item) {
                return (
                  <div key={uuidv4()} className="commander">
                    <img className="commander-flag" src={item[1]} alt="" />
                    <p>{item[0]}</p>
                  </div>
                );
              })}
            </div>
            <div className="stats">
              <h2>Battle Statistics</h2>
              <h3>
                Strength:
                {armyOneStrength.number !== 0
                  ? `${armyOneStrength.number}`
                  : "unknown"}
              </h3>
              <h3>
                Guns:
                {armyOneStrength.guns !== 0
                  ? `${armyOneStrength.guns}`
                  : "unknown"}
              </h3>
              <h3>
                Casualties:
                {armyOneCasualties && armyOneCasualties}
              </h3>
            </div>
          </div>
          <div className="content">
            <div className="battle-title-result">
              <div className="title">
                <h1>
                  {battleTitle.startsWith("Siege")
                    ? `${battleTitle} - ${battle.year}`
                    : `Battle of ${battleTitle} - ${battle.year}`}
                </h1>
              </div>
              <div className="battle-img">
                <img src={battle.imageUrl} alt="" />
              </div>
              <div className="year">{battle.year}</div>
              <div className="result">{battle.result}</div>
            </div>

            <div className="prelude">{battle.prelude}</div>
            <div className="main">{battle.description}</div>
          </div>
          {/* ARMY TWO------------------------------------ */}
          <div className="army">
            {/* ARMY TWO */}
            <div className="beligerents">
              {/* ARMY TWO */}
              {battle.armyTwo.beligerents.map(function (item) {
                return (
                  <div className="beligerent" key={uuidv4()}>
                    <img className="beligerent-flag" src={item[1]} alt="" />

                    <h3>{item[0]}</h3>
                  </div>
                );
              })}
            </div>
            <div className="commanders">
              <h2>Commanders</h2>
              {battle.armyTwo.commanders.map(function (item) {
                return (
                  <div key={uuidv4()} className="commander">
                    <img className="commander-flag" src={item[1]} alt="" />
                    <p>{item[0]}</p>
                  </div>
                );
              })}
            </div>
            <div className="stats">
              <h2>Battle Statistics</h2>
              <h3>
                Strength:
                {armyTwoStrength.number !== 0
                  ? `${armyTwoStrength.number}`
                  : "unknown"}
              </h3>
              <h3>
                Guns:
                {armyTwoStrength.guns !== 0
                  ? `${armyTwoStrength.guns}`
                  : "unknown"}
              </h3>
              <h3>
                Casualties:
                {armyTwoCasualties && armyTwoCasualties}
              </h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BattleDetail;
