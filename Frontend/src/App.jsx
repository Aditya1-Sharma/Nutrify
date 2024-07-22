import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Track from "./components/Track";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Nutrition Tracker Applications</h1>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>

          <Route path="/login" element={<Login />}></Route>
          <Route path="/track" element={<Track />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
