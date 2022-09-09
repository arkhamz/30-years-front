import { LOGIN,LOGOUT } from "./userSlice"
// import { auth } from "../../firebase/config"
import {createUserWithEmailAndPassword, updateProfile,signInWithEmailAndPassword,signOut,getAuth} from "firebase/auth"

const auth = getAuth()

export function signup(email,password,username,navigator){

    // had bug earlier, logging the values before I sent them to firebase helped me see that the values were incorrect
    // console.log(email,password,username);
    return async function(dispatch,getState){

        try {
            const response = await createUserWithEmailAndPassword(auth,email,password);
            // user is immediately logged in if sucessfully created
            if(!response){
                throw new Error("Could not complete signup");
            }
            const user = response.user;
            const userToken = user.accessToken;
            //update firebase user's displayName property to match username param
            await updateProfile(user,{displayName:username});
            console.log(user);
            const newUser = {
                email: user.email,
                displayName: user.displayName,
                id: user.uid,
            }
            dispatch(LOGIN({newUser, userToken}));
            // move to atlas page
            navigator("/atlas");
            
        } catch (e) {
            console.log(e);
            console.log(e.message);
            
        }

    }
}


export function login(email,password, navigator){
    return async function(dispatch,getState){

        try {
            const response = await signInWithEmailAndPassword(auth,email,password)
            // user is immediately logged in if sucessfully created
            const user = response.user;
            const userToken = user.accessToken;

            const newUser = {
                email: user.email,
                displayName: user.displayName,
                id: user.uid,
            }
            dispatch(LOGIN({newUser, userToken}));
            navigator("/atlas");
            
        } catch (e) {
            console.log(e);
            console.log(e.message);  
        }

    }
}

export function logout(){
    return async function(dispatch,getState){

        try {
            await signOut(auth);
            dispatch(LOGOUT());
            
        } catch (e) {
            console.log(e);
            console.log(e.message);  
        }

    }
}