import { LOGIN,LOGOUT } from "./userSlice"
import axios from "axios"
// import { auth } from "../../firebase/config"
import {createUserWithEmailAndPassword, updateProfile,signInWithEmailAndPassword,signOut,getAuth} from "firebase/auth"

const auth = getAuth()

export function signup(email,password,username,navigator){

    // had bug earlier, logging params before sending to firebase helped me see that the values were incorrect
    // console.log(email,password,username);
    return async function(dispatch,getState){

        try {
            //CREATE USER ON FIREBASE AUTH
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

            //CREATE SEQUELIZE USER - {id (auto),displayName, email,uid}
            const dbresponse = await axios.post(`http://localhost:4000/users/new`, {
                displayName: username,
                email:email,
                uid: user.uid
            });
            // endpoint returns database user's id
            const {userId} = dbresponse.data;
            if(!userId){
                throw new Error("No user ID returned from db user creation")
            }

            // CREATE SEQUELIZE USERPROGRESS INSTANCE FOR USER
            const progressResponse = await axios.post(`http://localhost:4000/progress/new`,{
                userId: userId,
                battleId: 1
            });
            console.log("hello")
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