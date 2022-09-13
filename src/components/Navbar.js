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
  // token represents currently logged in user, loads faster than user state
  const token = useSelector(selectToken);
  const [menuOpen,setMenuOpen] = useState(false);

  function handleClick(){
    dispatch(logout())
  }


  function handleMenuClick(){
    setMenuOpen(!menuOpen);
  }

  // Code for closing the collapsible <ul> when you click on a link
  function handleLinkClick(e){
    
    if(e.target.tagName === "A"){
      if(menuOpen){
        setMenuOpen(false);
      }
    }

  }


  return (
    <nav>
      <ul onClick={handleLinkClick} className={menuOpen ? "links links-active" : "links"}>
        <img className="nav-logo" src={test} alt="" />
        <NavLink to="/atlas"><FaGlobeEurope className="globe"/></NavLink>
        <NavLink to="/background">Background</NavLink>
        <NavLink to="/commanders">Commanders</NavLink>
        {!token ? <NavLink to="/signup">Signup</NavLink> : null }
       { !token ? <NavLink to="/login">Login</NavLink> : <button onClick={handleClick}>Logout</button> }
      </ul>
      <div onClick={handleMenuClick} className="nav-toggler">
        <Link className="menu-icon" to="#"> {menuOpen ? <AiOutlineClose/> : <AiOutlineMenu/>  }</Link>
      </div>
    </nav>
  );
}

export default Navbar;
