import React, { useEffect, useState, useRef } from "react";
import "./AngryBird.css";
import First from "../../Music/First.mp3";
import Second from "../../Music/Second.mp3";
import Bird from "../../Logo/Bird.png";

const AngryBird = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false); // Track if the game has started
  let intervalRef = useRef(null); // Using useRef to hold the interval reference

  let audio1 = new Audio(First);
  let audio2 = new Audio(Second);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const randomX = Math.floor(Math.random() * (screenWidth - 50)); // Subtract 50 for ball size
    const randomY = Math.floor(Math.random() * (screenHeight - 50)); // Subtract 50 for ball size

    setPosition({ x: randomX, y: randomY });

    // Cleanup function to clear the interval when the component unmounts or when the game restarts
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []); // Run only on initial render

  const startTimer = () => {
    // Set up the interval to decrement the time left every second
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft === 1) {
          // If time runs out, end the game
          clearInterval(intervalRef.current);
          setGameOver(true);
        }
        return timeLeft - 1;
      });
    }, 1000);
  };

  const clickHandler = () => {
    if (!gameStarted) {
      // Start the game if it hasn't started yet
      startTimer();
      setGameStarted(true);
    }
    audio2.play();
    setScore((score) => score + 1);
    if (score >= highScore) {
      setHighScore((score) => score + 1);
    }
    // Reset the ball position when clicked
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const randomX = Math.floor(Math.random() * (screenWidth - 50));
    const randomY = Math.floor(Math.random() * (screenHeight - 50));

    setPosition({ x: randomX, y: randomY });
  };

  const restartGame = () => {
    // Reset score, time left, and game over state
    setScore(0);
    audio1.play();
    setTimeLeft(10);
    setGameOver(false);
    clearInterval(intervalRef.current); // Clear the interval before starting again
    setGameStarted(false); // Reset the game started state
  };

  return (
    <div className="angry-bird-main-div" style={{ padding: "0 50px" }}>
      <div className="score-div">
        <h3>Score: {score}</h3>
        <h3>High Score: {highScore}</h3>
        <h3>Time Left: {timeLeft}</h3>
      </div>
      {!gameOver ? (
        <div
          style={{ position: "absolute", top: position.y, left: position.x }}
        >
          <div className="img-div" onClick={clickHandler}>
            <img className="bird-image" src={Bird} alt="" />
          </div>
        </div>
      ) : (
        <div className="game-over">
          <h1>Game Over</h1>
          <button className="restart-btn" onClick={restartGame}>
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default AngryBird;
