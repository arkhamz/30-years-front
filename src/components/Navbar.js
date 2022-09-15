import "./Navbar.css";
import { useState,useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../store/user/userThunks";
import { useDispatch, useSelector } from "react-redux";
import test from "../okayTest.svg";
import {
  selectProgress,
  selectToken,
  selectUser,
} from "../store/user/userSelectors";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaGlobeEurope } from "react-icons/fa";
// import { GiCrossedSwords } from "react-icons/gi";
import {statusIcons, titler} from "../helpers";

function Navbar() {
  // When logged in, you should not see Home, you should start at atlas
  //When logged in, you should not see signup or logout

  const dispatch = useDispatch();
  // token represents currently logged in user, loads faster than user state
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const [menuOpen, setMenuOpen] = useState(false);
  const progress = useSelector(selectProgress);
  const [title,setTitle] = useState("");

  function handleClick() {
    dispatch(logout());
  }

  function handleMenuClick() {
    setMenuOpen(!menuOpen);
  }

  // Code for closing the collapsible <ul> when you click on a link OR LOGOUT BUTTON
  function handleLinkClick(e) {
    if (e.target.tagName === "A" || e.target.tagName === "BUTTON") {
      if (menuOpen) {
        setMenuOpen(false);
      }
    }
  }

  useEffect(function(){

    if(progress >= 1){
      const newTitle = titler(progress);
      setTitle(newTitle);
    }
  },[progress]);


  return (
    <nav>
      <ul
        onClick={handleLinkClick}
        className={menuOpen ? "links links-active" : "links"}
      >
        <img className="nav-logo" src={test} alt="" />
        <div className="status">
          {progress
            ? statusIcons(progress).map(function (item, index, arr) {
                return <item.Component key={index} className={item.class} />;
              })
            : null}
        </div>
        {user && title ?  <span>{user.displayName}(<em>{title}</em>)</span> : null}
        <NavLink to="/atlas">
          <FaGlobeEurope className="globe" />
        </NavLink>
        <NavLink to="/background">Background</NavLink>
        <NavLink to="/commanders">Commanders</NavLink>
        {!token ? <NavLink to="/signup">Signup</NavLink> : null}
        {!token ? (
          <NavLink to="/login">Login</NavLink>
        ) : (
          <button onClick={handleClick}>Logout</button>
        )}
      </ul>
      <div onClick={handleMenuClick} className="nav-toggler">
        <Link className="menu-icon" to="#">
          {" "}
          {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
