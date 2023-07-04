import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

const Login = ({ users }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here, e.g., send username and password to an API
    let foundUser = false;

    users.forEach((user) => {
      if (user.email === username && user.password === password) {
        localStorage.setItem("currentUser", JSON.stringify(user));

        foundUser = true;
        navigate("/");
      }
      
    });

    if (!foundUser) {
      setError("Invalid username or password");
    }

    // Reset form fields
    setUsername("");
    setPassword("");
  };

  return (
    <>
    <div className="container">
         <NavBar/>
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-button">
          Login
        </button>
        <p>Don't have an account ? 

        <Link className="signupLink" to="/signup">
       Sign up
        </Link>
        </p>
        
      </form>
    </div>
 
    </div>
    <Footer/>
    </>
  );
};

export default Login;
