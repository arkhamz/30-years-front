import { useDispatch, useSelector } from "react-redux";
import { selectOneBattle } from "../store/battle/battleSelectors";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchOneBattle, fetchProgress } from "../store/battle/battleThunks";
import { v4 as uuidv4 } from "uuid";
import {
  GiCannon,
  GiPikeman,
  GiArmBandage,
  GiDeathSkull,
} from "react-icons/gi";
import "./BattleDetail.css";
import { selectProgress, selectUser } from "../store/user/userSelectors";
import Quiz from "../components/Quiz";
import { clearBattleDetail } from "../store/battle/battleSlice";
import { Fade } from "react-awesome-reveal";

function BattleDetail() {
  const { id } = useParams();
  const battle = useSelector(selectOneBattle);
  const progress = useSelector(selectProgress);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log(progress);

  useEffect(function () {
    //dispatch thunk action to get battle
    dispatch(fetchOneBattle(id));
    dispatch(fetchProgress());

    //BUG FIX
    //if you visit battle page then go to another
    //takes a while for new battleDetail to replace new battleDetail state. old content visible
    //for a split second. cleanup function should clear battleDetail state when we exit the page

    return function () {
      dispatch(clearBattleDetail());
    };
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
          {/* render page content if progress exists & user progress is greater than or equal to battle Id */}
          {/* greater than means that the user has already unlocked it */}
          {progress && progress >= Number(id) ? (
            <>
              {/* ARMY ONE */}
              <div className="army-1">
                <div className="beligerents-1">
                  {battle.armyOne?.beligerents.map(function (item) {
                    return (
                      <div className="beligerent" key={uuidv4()}>
                        <img loading="lazy" className="beligerent-flag" src={item[1]} alt="" />
                        <h3>{item[0]}</h3>
                      </div>
                    );
                  })}
                </div>

                <div className="commanders-1">
                  <h2>Commanders</h2>
                  {/* ARMY ONE */}
                  {battle.armyOne?.commanders.map(function (item) {
                    return (
                      <div key={uuidv4()} className="commander">
                        <img loading="lazy" className="commander-flag" src={item[1]} alt="" />
                        <p>{item[0]}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="stats-1">
                  <h2>Battle Statistics</h2>
                  <h3>
                    <GiPikeman /> -
                    {armyOneStrength.number !== 0
                      ? ` ${armyOneStrength.number}`
                      : "   unknown"}
                  </h3>
                  <h3>
                    <GiCannon /> -
                    {armyOneStrength.guns !== 0
                      ? `   ${armyOneStrength.guns}`
                      : "   unknown"}
                  </h3>
                  <h3>
                    <GiDeathSkull /> / <GiArmBandage /> -
                    {armyOneCasualties && `   ${armyOneCasualties}`}
                  </h3>
                </div>
              </div>

              {/* BATTLE CONTENT - title,picture,date */}
              <div className="content">
                <div className="title">
                  <h1>
                    {battleTitle.startsWith("Siege")
                      ? `${battleTitle} - ${battle.year}`
                      : `Battle of ${battleTitle} - ${battle.year}`}
                  </h1>
                </div>

                <div className="battle-img">
                  <Fade direction={"top"}>
                    <img loading="lazy" className="battle-pic" src={battle.imageUrl} alt="" />
                  </Fade>
                </div>

                <div className="year">
                  <h2>{battle.date}</h2>
                </div>
                <div className="result">
                  {" "}
                  <h2>Result: {battle.result}</h2>
                </div>
              </div>

              <div className="battle-detail">
                <Fade>
                  <div className="prelude">
                    <h2>Prelude</h2>
                    <p>{battle.prelude}</p>
                  </div>
                </Fade>

                <Fade>
                  <div className="description">
                    <h2>Battle Summary</h2>
                    <p>{battle.description}</p>
                  </div>
                </Fade>
              </div>

              {/* ARMY TWO------------------------------------ */}

              {/* ARMY TWO */}

              <div className="army-2">
                <div className="beligerents-2">
                  {/* ARMY TWO */}
                  {battle.armyTwo.beligerents.map(function (item) {
                    return (
                      <div className="beligerent" key={uuidv4()}>
                        <img loading="lazy" className="beligerent-flag" src={item[1]} alt="" />

                        <h3>{item[0]}</h3>
                      </div>
                    );
                  })}
                </div>

                <div className="commanders-2">
                  <h2>Commanders</h2>
                  {battle.armyTwo.commanders.map(function (item) {
                    return (
                      <div key={uuidv4()} className="commander">
                        <img loading="lazy" className="commander-flag" src={item[1]} alt="" />
                        <p>{item[0]}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="stats-2">
                  <h2>Battle Statistics</h2>
                  <h3>
                    <GiPikeman /> -
                    {armyTwoStrength.number !== 0
                      ? ` ${armyTwoStrength.number}`
                      : "   unknown"}
                  </h3>
                  <h3>
                    <GiCannon /> -
                    {armyTwoStrength.guns !== 0
                      ? `   ${armyTwoStrength.guns}`
                      : "   unknown"}
                  </h3>
                  <h3>
                    <GiDeathSkull /> / <GiArmBandage /> -
                    {armyTwoCasualties && `   ${armyTwoCasualties}`}
                  </h3>
                </div>
              </div>

              <div className="quiz-wrapper">
                {/* render quiz if battle id/param matches current unlock/progress */}
                {Number(id) === progress && (
                  <Fade>
                    <Quiz
                      battleId={id}
                      uid={user.uid}
                      questions={battle.questions}
                    />
                  </Fade>
                )}
              </div>

              <div className="video">
                {/*show video if battleId not equal to progress - i.e. not equal to the currently unlocked one */}
              {Number(id) !== progress && (
                <>
                  <iframe width="560" height="315" src={battle.videoUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </>
              )}
              </div>
            </>
          ) : (
            <h1 style={{ position: "absolute", top: "50%", left: "30%" }}>
              This battle has not been unlocked
            </h1>
          )}
        </div>
      )}
    </>
  );
}

export default BattleDetail;
