import "./App.css";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_IS_READY } from "./store/user/userSlice";
import { Routes, Route,Navigate } from "react-router-dom";
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
import {selectAuthCheck,selectToken,selectUser} from "./store/user/userSelectors";
import Spinner from "./components/Spinner";
import Error from "./pages/Error";
import MessageBox from "./components/MessageBox";
import { fetchProgress } from "./store/battle/battleThunks";
import Footer from "./components/Footer";
import Game from "./pages/Game";

function App() {
  const dispatch = useDispatch();
  const authCheck = useSelector(selectAuthCheck);
  const token = useSelector(selectToken);

  useEffect(function () {
    // monitor app for auth state changes e.g. initial auth connection, logins,logouts etc
    const unsubscribe = onAuthStateChanged(auth, function (user) {

      if (user) {
        // create custom user object, DO NOT STORE non-serialisables in redux state. Store simpler custom obj instead
        // const userToken = user.accessToken;
        const newUser = {
          email: user.email,
          displayName: user.displayName,
          uid: user.uid,
        };
        // set auth check to true, store user and token in redux state
        console.log("executing onAuthStateChange callback")
        // dispatch(fetchProgress());
        dispatch(AUTH_IS_READY({ newUser, userToken:user.accessToken }));
        // dispatch(AUTH_IS_READY({ newUser, token })); ///this does not cause the immdiate signup re-direct bugq
      } else {
        dispatch(AUTH_IS_READY({ newUser: null, userToken: null }));
      }
    });

    return function () {
      unsubscribe();
    };
  }, []);

  return (
    <div className="App">
      {authCheck && (
        <>
          <Navbar />
          <Spinner/>
          <MessageBox/>
          <Routes>
            <Route path="/" element={ !token ? <Home /> : <Navigate to="/atlas" />} />
            <Route path="/atlas" element={ token ? <Atlas /> : <Navigate to="/login"/>} />
            <Route path="/battles/:id" element={ token ? <BattleDetail /> : <Navigate to="/login" />} />
            <Route path="/commanders" element={ token ? <Commanders /> : <Navigate to="/login" />} />
            <Route path="/commanders/:id" element={ token ? <CommanderDetail/> : <Navigate to="/login" /> } />
            <Route path="/background" element={<Background />} />
            <Route path="/signup" element={ !token ? <Signup /> : <Navigate to="/background" />} />
            <Route path="/login" element={!token ? <Login /> : <Navigate to="/atlas" />} />
            <Route path="/404" element={<Error/>} />
            <Route path="/game" element={token ? <Game/> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
