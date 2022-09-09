import "./Navbar.css";
import { Link,NavLink } from "react-router-dom";
import { logout } from "../store/user/userThunks";
import { useDispatch, useSelector } from "react-redux";
import test from "../okayTest.svg";
import { selectToken, selectUser } from "../store/user/userSelectors";

function Navbar() {
  // When logged in, you should not see Home, you should start at atlas
  //When logged in, you should not see signup or logout

  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  // user represents currently logged in user

  function handleClick(){
    dispatch(logout())
  }


  return (
    <nav>
      <ul className="links">
        {/* <li className="brand">historyMate</li> */}
        <img className="nav-logo" src={test} alt="" />
        <NavLink to="/atlas">Atlas</NavLink>
        <NavLink to="/background">Background</NavLink>
        <NavLink to="/commanders">Commanders</NavLink>
        {!token ? <NavLink to="/signup">Signup</NavLink> : null }
       { !token ? <NavLink to="/login">Login</NavLink> : <button onClick={handleClick}>Logout</button> }
        
      </ul>
    </nav>
  );
}

export default Navbar;
