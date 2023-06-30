import { Link } from "react-router-dom";
import React, { useState } from "react";

import "./NavBar.css";
import logo from "../../assests/the.png";
const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="logo">
          <img src={logo} alt="upscale tast" />
        </Link>

        <button className="navbar-toggler" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className={`navbar-menu ${showMenu ? "show" : ""}`}>
        <ul>
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          {/* <li>
            {" "}
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
