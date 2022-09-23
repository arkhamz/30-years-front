import "./GameCard.css";
import backpic from "../smoke-card.jpeg"

function GameCard({ com, handleChoice, flipped, disabled }) {
  //   function handleClick(e) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     handleChoice(mon);
  //   }
  return (
    <div className="card-container">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={com.src} alt="front-side" />
        <img
          className="back"
          src={backpic}
          onClick={function (e) {
            if (disabled === false) {
              // do stuff only if cards are not disabled
              e.preventDefault();
              e.stopPropagation();
              handleChoice(com);
            }
          }}
          alt="back-side"
        />
      </div>
    </div>
  );
}

export default GameCard;