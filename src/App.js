import "./App.css";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { useDispatch,useSelector } from "react-redux";
import { AUTH_IS_READY } from "./store/user/userSlice";
import { Routes, Route } from "react-router-dom";
//pages & components
import Atlas from "./pages/Atlas";
import Background from "./pages/Background";
import Home from "./pages/Home";
import BattleDetail from "./pages/BattleDetail";
import Commanders from "./pages/Commanders";
import CommanderDetail from "./pages/CommanderDetail";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { selectAuthCheck, selectProgress, selectUser } from "./store/user/userSelectors";
import { fetchBattles } from "./store/battle/battleThunks";


function App() {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const authCheck = useSelector(selectAuthCheck);
  const progress = useSelector(selectProgress);

  console.log(user);
  console.log(progress)

  useEffect(function(){
    // monitor app for auth state changes e.g. initial auth connection, logins,logouts etc
    const unsub = onAuthStateChanged(auth, function(user){
      // user will be non-serialisable (complex class object/function) user object if logged in, or null if logged out
      if(user){
        // create custom user object, DO NOT STORE non-serialisables in redux state. Store simpler custom obj instead
        const userToken = user.accessToken;
        const newUser = {
          email: user.email,
          displayName: user.displayName,
          uid: user.uid,
      }
       dispatch(AUTH_IS_READY({newUser, userToken}));

      } else{
        dispatch(AUTH_IS_READY({newUser: null, userToken: null}));
      }
    });
    return function(){
      unsub();
    }

  },[])


  return (
    <div className="App">
      {authCheck && (
        <>
        <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/atlas" element={<Atlas />} />
        <Route path="/battles/:id" element={<BattleDetail />} />
        <Route path="/commanders" element={<Commanders />} />
        <Route path="/commanders/:id" element={<CommanderDetail />} />
        <Route path="/background" element={<Background />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
        </>
      )}
      
    </div>
  );
}

export default App;
