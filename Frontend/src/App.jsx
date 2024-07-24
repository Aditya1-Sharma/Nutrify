import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Track from "./components/Track";
import { userContext } from "./contexts/UserContext";
import { useState } from "react";
import Private from "./components/Private";
import Header from "./components/Header";
function App() {
  const [loggedUser, setLoggedUser] = useState(
    JSON.parse(localStorage.getItem("nutrify-user"))
  );
  useEffect(() => {
    console.log(loggedUser);
  }, []);

  return (
    <>
      <h1>Nutrition Tracker Applications</h1>

      <userContext.Provider value={{ loggedUser, setLoggedUser }}>
        <Routes>
          <Route path="/" element={<Login />}></Route>

          <Route path="/register" element={<Register />}></Route>
          <Route path="/header" element={<Header />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/track" element={<Private Component={Track} />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </userContext.Provider>
    </>
  );
}

export default App;
