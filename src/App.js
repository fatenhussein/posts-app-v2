import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./components/Login/Login";
import { useEffect, useState } from "react";
import axios from "axios";
import Register from "./components/Register/Register";

function App() {
  const [users, setUsers] = useState([]);

  const apiUrl = "http://localhost:3500/users";

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(apiUrl);
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login users={users} />} />
          <Route path="/signup" element={<Register users={users} />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
