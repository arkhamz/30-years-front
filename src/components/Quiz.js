import { useState,useEffect } from "react"
import "./Quiz.css"
import {v4 as uuidv4} from "uuid";
import { fetchProgress } from "../store/battle/battleThunks";
import { useDispatch } from "react-redux";
import { unlockNext } from "../store/battle/battleThunks";
import {TiTickOutline} from "react-icons/ti"

export default function Quiz({questions, uid, battleId}){

    const [current,setCurrent] = useState(0);
    //current will act as questions index, represents question user is on
    // current will be increased by one whenever an answer button is clicked
    //e.g. starts with 1st question visible, then moves to next question
    //since we are looping through array of questions
    const [score, setScore] = useState(0);
    const dispatch = useDispatch();

  function handleClick(answer){

    // If answer is true, increase score. As long as score is not equal to 2
    if(answer === true && score !== 2){
            setScore( score + 1)
    }

    //only increase current is less than total no. of questions it
    if(current  < questions.length - 1){
        setCurrent(current + 1);
    };
    
  }

  useEffect(function(){
    // only unlock the next battle if battleId is not currently 12, i.e. last battle
    if(score === 2 & battleId != "12"){
        //dispatch thunk that unlocks next battle and update progress
        dispatch(unlockNext(battleId, uid));
        // update progress in state
        dispatch(fetchProgress());
    }
  })


    return (
        <>
        {questions && score < 2 ? (
            <div className="questions-container">

                <div className="questions-">
                    <div className="score">
                        Score: {score}
                    </div>
                    
                    <div className="question-count">
                        {/* <span>Question {current + 1}</span> / {questions.length} */}
                        <h2>Question {current + 1} / {questions.length} </h2>
                    </div>
                    
                    <div className="question-text">
                        <h3>{questions[current].text}</h3>
                    </div>

                    <div className="score-icon">
                        {score === 1 && <TiTickOutline/>}
                        {score === 2 && (
                            <>
                            <TiTickOutline/>
                            <TiTickOutline/>
                            
                            </>
                        )}

                    </div>

                </div>
                
                <div className="answer-section">
                    {questions[current] && questions[current].answerOptions.map(function(item,index,arr){
                        return <button className="answer-btn" key={uuidv4()} onClick={() => handleClick(item.isCorrect)}>{item.answerText}</button>
                    })}
                </div>

                
                
            </div>
         
        ) : null}
        </>
       
    )


}