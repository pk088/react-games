import React, { useEffect, useState } from "react";
import "./NumberGuess.css"; // Import CSS file

const Offer = () => {
  const [val, setVal] = useState();
  const [inputval, setInputVal] = useState("");
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(3); // Maximum attempts allowed
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const randomValue = Math.floor(Math.random() * 100);
    setVal(randomValue);
  }, [score]);

  const inputHandler = (e) => {
    setInputVal(e.target.value);
    const inputNumber = parseInt(e.target.value);
    if (inputNumber === val) {
      setScore((score) => score + 1);
      setInputVal("");
    } else if (attempts === 0) {
      setGameOver(true);
    } else if (!isNaN(inputNumber) && inputNumber >= 10 && inputNumber <= 99) {
      setAttempts((attempts) => attempts - 1);
      setInputVal("");
    }
  };

  const restartGame = () => {
    setScore(0);
    setAttempts(3);
    setGameOver(false);
    setVal(Math.floor(Math.random() * 100));
    setInputVal("");
  };

  return (
    <div className="container">
      <div>
        {!gameOver ? (
          <>
            <h1 className="random-value">{val}</h1> {/* Apply animation class here */}
            <input
              className="input-field"
              type="text"
              value={inputval}
              onChange={(e) => inputHandler(e)}
              placeholder="Guess the Number"
            />
            <h3>Attempts Left: {attempts}</h3>
            <h3>Score: {score}</h3>
          </>
        ) : (
          <div>
            <h1>Game Over</h1>
            <h2>Your Score: {score}</h2>
            <button className="restart-button" onClick={restartGame}>Restart</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Offer;
