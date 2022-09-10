import { useState,useEffect } from "react"
import {v4 as uuidv4} from "uuid";
import { fetchProgress } from "../store/battle/battleThunks";
import { useDispatch, useSelector } from "react-redux";
import { unlockNext } from "../store/battle/battleThunks";
import { selectProgress } from "../store/user/userSelectors";


export default function Quiz({questions, uid, battleId}){

    const [current,setCurrent] = useState(0);
    //current will act as questions index, represents question user is on
    // current will be increased by one whenever an answer button is clicked
    //e.g. starts with 1st question visible, then moves to next question
    //since we are looping through array of questions
    const [score, setScore] = useState(0);
    const dispatch = useDispatch();
    const progress = useSelector(selectProgress);

    

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
    if(score === 2){
        //dispatch thunk that unlocks next battle and update progress
        dispatch(unlockNext(battleId, uid));
        // update progress
        dispatch(fetchProgress());
    }
  })
   
    // {
    //     text: "dsdsdss",
    //     answerOptions: [
    //         {answerText: "dsdsd", isCorrect: true},
    //         ...
    //     ]
    // }
    
    
    return (
        <>
        {questions && score < 2 ? (
            <div className="questions-container">
                <div className="score">
                    Score: {score}
                </div>
                <div className="question-count">
                    <span>Question {current + 1}</span> / {questions.length}
                </div>
                <div className="question-text">
                    {questions[current].text}
                </div>
                <div className="answer-section">
                    {questions[current] && questions[current].answerOptions.map(function(item,index,arr){
                        return <button key={uuidv4()} onClick={() => handleClick(item.isCorrect)}>{item.answerText}</button>
                    })}
                </div>

                
                
            </div>
         
        ) : null}
        </>
       
    )


}