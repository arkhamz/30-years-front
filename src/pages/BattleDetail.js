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

  // // START OF BATTLE OBJECT
  // name: "White Mountain",
  // prelude: "T",
  // description: ".",
  // imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/02/The_Battle_of_White_Mountain_%28by_Peter_Snayers%29.jpg",
  // videoUrl: "https://youtu.be/ZIEU_um0GfQ?list=PLaBYW76inbX58d5W9sQG9DZVjdzqcALbF",
  // result: "Catholic Imperial-Spanish victory",
  // year: 1620,
  // date: "8 November 1620",
  // latitude: "50.078333",
  // longitude: "14.319444",
  // armyOne: JSON.stringify({
  //   beligerents:[["Holy Roman Empire",hre],["Catholic League",catholic],["Spanish empire",spanish]],
  //   commanders: [["Johann von Tilly",catholic],["Maximilian I",catholic],["Charles de Bucquoy",hre]],
  //   strength: {number: 23000, guns:12},
  //   casualties: "650 killed and wounded"
  // }),
  // armyTwo: JSON.stringify({
  //   beligerents:[["Bohemian Confederation",bohemia],["Electoral Palatinate",palatinate]],
  //   commanders: [["Christian of Anhalt", palatinate],["Jindřich Matyáš Thurn", bohemia]],
  //   strength: {number: 21000, guns:10},
  //   casualties: "2,800 killed and wounded"
  // }),
  // questions: JSON.stringify({
  //   question1: {
  //     text: "How long did the battle last?",
  //     answerOptions:[
  //       {answerText: "3 hours", isCorrect:false},
  //       {answerText: "1 hour", isCorrect:true},
  //       {answerText: "4 hours", isCorrect:false},
  //     ]
  //   },
  //   question2: {
  //     text: "What triggered the rebellion?",
  //     answerOptions:[
  //       {answerText: "Lack of food", isCorrect:false},
  //       {answerText: "Protestants throwing catholic imperial representatives out of a castle window", isCorrect:true},
  //       {answerText: "religious harmony", isCorrect:false},
  //     ]
  //   }

  // }),
  // createdAt: new Date(),
  // updatedAt: new Date()
  // //END OF BATTLE OBJECT

  return (
    <>
      {battle && (
        <div className="battle-container">
          <div className="army-one">
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
              {battle.armyOne?.commanders.map(function (item) {
                return (
                  <div key={uuidv4()} className="commander">
                    <img className="commander-flag" src={item[1]} alt="" />
                    <h3>{item[0]}</h3>
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
              <div className="year">{battle.year}</div>
              <div className="result">{battle.result}</div>
            </div>

            <div className="prelude">{battle.prelude}</div>
            <div className="main">{battle.description}</div>
          </div>
          <div className="army-two">
            <div className="beligerents">
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
                    <h3>{item[0]}</h3>
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
