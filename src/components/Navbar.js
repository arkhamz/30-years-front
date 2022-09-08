import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  // When logged in, you should not see Home, you should start at atlas
  //When logged in, you should not see signup or logout

  return (
    <nav>
      <ul className="links">
        <li className="brand">historyMate</li>
        <Link to="/atlas">Atlas</Link>
        <Link to="/background">Background</Link>
        <Link to="/commanders">Commanders</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
      </ul>
    </nav>
  );
}

export default Navbar;
