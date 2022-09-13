import "./Navbar.css";
import { useState } from "react";
import { Link,NavLink } from "react-router-dom";
import { logout } from "../store/user/userThunks";
import { useDispatch, useSelector } from "react-redux";
import test from "../okayTest.svg";
import { selectToken, selectUser } from "../store/user/userSelectors";
import {AiOutlineMenu,AiOutlineClose} from "react-icons/ai"
import {FaGlobeEurope} from "react-icons/fa"

function Navbar() {
  // When logged in, you should not see Home, you should start at atlas
  //When logged in, you should not see signup or logout

  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const [menuOpen,setMenuOpen] = useState(false);
  // token represents currently logged in user, loads faster than user state

  function handleClick(){
    dispatch(logout())
  }

  function handleMenuClick(){
    setMenuOpen(!menuOpen);

  }


  return (
    <nav>
      <ul className={menuOpen ? "links-menu" : "links"}>
        {/* <li className="brand">historyMate</li> */}
        <img className="nav-logo" src={test} alt="" />
        <NavLink to="/atlas"><FaGlobeEurope/></NavLink>
        <NavLink to="/background">Background</NavLink>
        <NavLink to="/commanders">Commanders</NavLink>
        {!token ? <NavLink to="/signup">Signup</NavLink> : null }
       { !token ? <NavLink to="/login">Login</NavLink> : <button onClick={handleClick}>Logout</button> }
        
      </ul>
    </nav>
  );
}

export default Navbar;
