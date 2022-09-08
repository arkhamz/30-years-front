import "./Navbar.css";
import { Link,NavLink } from "react-router-dom";
import test from "../okayTest.svg";

function Navbar() {
  // When logged in, you should not see Home, you should start at atlas
  //When logged in, you should not see signup or logout

  return (
    <nav>
      <ul className="links">
        {/* <li className="brand">historyMate</li> */}
        <img className="nav-logo" src={test} alt="" />
        <NavLink to="/atlas">Atlas</NavLink>
        <NavLink to="/background">Background</NavLink>
        <NavLink to="/commanders">Commanders</NavLink>
        <NavLink to="/signup">Signup</NavLink>
        <NavLink to="/login">Login</NavLink>
      </ul>
    </nav>
  );
}

export default Navbar;
