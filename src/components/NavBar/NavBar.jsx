import { Link , useNavigate } from "react-router-dom";
import React, { useState , useEffect } from "react";

import "./NavBar.css";
import logo from "../../assests/the.png";
const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  
  }, []);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const navigate = useNavigate();
  const signoutHandler = ()=>{
    navigate("/login");
    localStorage.setItem("currentUser", JSON.stringify(null));
   
  }
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
          <li>
            {currentUser ? (
              <div title={currentUser.username} id="basic-nav-dropdown">
             
                <Link
                  className="dropdown-item"
                  to="#signout"
                  // onClick={signoutHandler}
                >
                  {currentUser.username}
                </Link>
                <Link
                  className="dropdown-item"
                  to="/login"
                  onClick={signoutHandler}
                >
                  Sign out
                </Link>
              </div>
            ) : (
              <>
              <Link className="nav-link" to="/login">
                Sign In
              </Link>
          
              </>
            )}
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
