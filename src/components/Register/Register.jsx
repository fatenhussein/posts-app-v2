import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import axios from "axios";
import { faker } from "@faker-js/faker";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
const Register = ({ users }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isExist, setIsisExist] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const apiUrl = "http://localhost:3500/users";

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation
    const errors = {};

    if (!username) {
      errors.username = "Username is required";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      let foundUser = false;
      const newUser = {
        email: email,
        username: username,
        password: password,
        avatar:  faker.image.avatar()
      };
      users.forEach((user) => {
        if (user.email === email) {
          foundUser = true;
          setIsisExist(true);
        }
       
      });
      if (!foundUser) {
       
        axios
          .post(apiUrl, newUser)
          .then((response) => {
            const users = response.data;
            localStorage.setItem("currentUser", JSON.stringify(users));
           
          })
          .catch((error) => {
            console.error("An error occurred:", error.response.data);
          });
          navigate("/");
      

        console.log("Registration submitted:", { username, email, password });
      }
    }
    // Perform registration logic here, e.g., send username, password, and email to an API

    // Reset form fields
    setUsername("");
    setPassword("");
    setEmail("");
  };

  return (
    <>
    <NavBar/>
    <div className="container">
    <div className="register-container">
      <h2 className="register-heading">Register</h2>
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
          {errors.username && <p className="error">{errors.username}</p>}
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
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            className="input-field"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <button type="submit" className="register-button">
          Register
        </button>
        {isExist && <label className="error">already registered</label>}
      </form>
    </div>
    </div>
    <Footer/>
    </>
  );
};

export default Register;
