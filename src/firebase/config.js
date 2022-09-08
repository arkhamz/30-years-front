import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBnLrP-BT2JkB0lFUZl2xwbuLT4dzFghEw",
    authDomain: "historymate-b9233.firebaseapp.com",
    projectId: "historymate-b9233",
    storageBucket: "historymate-b9233.appspot.com",
    messagingSenderId: "612181252749",
    appId: "1:612181252749:web:28365d819188ceea79a0c4"
};

  //initialise firebase
const app = initializeApp(firebaseConfig)

//initialise the authentication service
const auth = getAuth();

export default auth;