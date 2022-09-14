import { SET_MESSAGE,CLEAR_MESSAGE } from "./appStateSlice";


//takes message text
//saves object with type and text to message state - only used text
//clears message from state after 2 secs
export function showMessage(text){

    return function(dispatch,getState){
        // store message in state via dispatch action
        dispatch(SET_MESSAGE(text));

        //clear state message after 2000ms/2 seconds via dispatch action
        setTimeout(function(){
            dispatch(CLEAR_MESSAGE())
        }, 2500)
    }

}

// popup component will take message message fromk state
//store it
