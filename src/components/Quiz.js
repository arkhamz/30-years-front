import { useState } from "react"
import {v4 as uuidv4} from "uuid";


export default function Quiz({questions}){

    const question1 = questions.question1;
    const question2 = questions.question2
   
    // question: {
    //     text: "dsdsdss",
    //     answerOptions: [
    //         {answerText: "dsdsd", isCorrect: true},
    //         {answerText: "dsdsd", isCorrect: true},
    //         {answerText: "dsdsd", isCorrect: true}
    //     ]
    // }
    
    
    return (
        <>
        {questions && (
            <div className="questions-container">

                <div className="question-1 ">
                    <h2>{question1.text}</h2>
                    <ul>{question1.answerOptions && question1.answerOptions.map(function(item,index,arr){
                        return <p key={uuidv4()}>{item.answerText}</p>

                    })}</ul>
                </div>
                <div className="question-2 ">
                    <h2>{question2.text}</h2>
                    <ul>{question2.answerOptions && question2.answerOptions.map(function(item,index,arr){
                        return <p key={uuidv4()}>{item.answerText}</p>

                    })}</ul>
                </div>
            </div>
         
        )}
        </>
       
    )
}