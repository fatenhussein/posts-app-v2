import React from "react";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import Posts from "../components/Posts/Posts";

const Home = () => {
  return (
   <div className="home">
      <NavBar />
      <Posts />
      <Footer />
      </div>
  );
};

export default Home;
