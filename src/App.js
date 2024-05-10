import "./App.css";
import {BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home/Home";
import NumberGuess from "./Components/NumberGuess/NumberGuess";

import AngryBird from "./Components/AngryBird/AngryBird";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/numberguess" element={<NumberGuess />} />
          <Route path="/angrybird" element={<AngryBird />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
