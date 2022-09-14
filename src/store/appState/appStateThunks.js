import { SET_MESSAGE,CLEAR_MESSAGE } from "./appStateSlice";


//takes a type and text
//saves object with type and text to message state
//clears message from state after 2 secs
export function showMessage(type,text){

    return function(dispatch,getState){
        dispatch(SET_MESSAGE(type,text));

        //clear message after 2000ms/2 seconds

        setTimeout(function(){
            dispatch(CLEAR_MESSAGE)
        }, 2000)
    }

}

// popup component will select message fromk state
//store it
