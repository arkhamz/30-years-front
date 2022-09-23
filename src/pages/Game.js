import { useSelector, useDispatch } from "react-redux";
import { fetchCommanders } from "../store/commander/commanderThunks";
import { useState,useEffect } from "react";
import { selectCommanders } from "../store/commander/commanderSelectors";
import { shuffle } from "lodash";
import { v4 as uuidv4 } from "uuid";
import GameCard from "../components/GameCard";
import "./Game.css";
// import card component

function Game(){

    const dispatch = useDispatch();
    const commanders = useSelector(selectCommanders);
    const [cardOne, setCardOne] = useState(null);
    const [cardTwo, setCardTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [turns, setTurns] = useState(0);
    const [newFlag, setNewFlag] = useState(false);

    const [cards,setCards] = useState(null);

    // fetching commanders
  useEffect(
    function () {
      //dispatch thunk that fetches commanders
      dispatch(fetchCommanders());
    },
    []
  );

  useEffect(
    function () {

        if(commanders){
            const updated = shuffle(commanders.map(function(item){
                return {src: item.imageUrl, id:uuidv4(), matched:false}
            }));
            setCards(updated);
        }
    },
    [newFlag]
  );

  //comparing selected cards
  useEffect(
    function () {
      if (cardOne && cardTwo) {
        // disable all cards immediately once we have 2 selections so that further selections can't be made
        //this can overwrite current ones and break logic
        //set to false when we reset choices
        setDisabled(true);
        // if cardone image source is equal to card 2, and ids are different
        // added id check otherwise clicking 1 would automatically show both pics
        if (cardOne.src === cardTwo.src && cardOne.id !== cardTwo.id) {
          setCards(function (prevArr) {
            return prevArr.map(function (item) {
              if (item.src === cardOne.src) {
                return { ...item, matched: true };
              } else {
                return item;
              }
            });
          });
          //   reset choices after correct match
          resetChoices();
        } else {
          // reset choices after wrong match
          // wrap reset call in setTimeout to prevent failed match immediately removing the card face

          setTimeout(function () {
            resetChoices();
          }, 1000);
        }
      }
    },
    [cardOne, cardTwo]
  );

   //   handler for selecting a card/clicking a card, related to flip logic
   function handleChoice(cardObj) {
    // set value for card 1 and card 2
    console.log("setting");
    cardOne ? setCardTwo(cardObj) : setCardOne(cardObj);
  }
  //reset choices when 2 cards selected and have been compared
  function resetChoices() {
    setCardOne(null);
    setCardTwo(null);
    setTurns((curr) => curr + 1);
    setDisabled(false);
  }

//   resets game state
  function resetGame() {
    setCardOne(null);
    setCardTwo(null);
    setTurns(0);
    setDisabled(false);
    setNewFlag(!newFlag);
  }

  return (
      <div className="memory-container">
        <div className="turns-new">
            <h2>Turns: {turns}</h2>
            <button onClick={resetGame}>New Game/Reset</button>
        </div>
        <ul className="card-list">
          {cards &&
            cards.map(function (item, index, arr) {
              return (
                <GameCard
                  key={item.id}
                  className="Card"
                  handleChoice={handleChoice}
                  com={item}
                  disabled={disabled}
                  flipped={item === cardOne || item === cardTwo || item.matched}
                />
              );
            })}
        </ul>
      </div>
   
  );
}

export default Game;