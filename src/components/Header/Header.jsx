import React, { useState, useEffect } from "react";
import "./Header.css";
import backround from "../../assets/syun-up.png";
import EasyMode from "../CardTable_Easy/easyMode";
import MediumMode from "../CardTable_Medium/mediumMode";
import HardMode from "../CardTable_Hard/hardMode";
import middle from "../../assets/syun-middle.png";
import down from "../../assets/syun-down.png";
import fullScreen from "../../assets/fullscreen.png";

const Header = () => {
  const [start, setStart] = useState(false); 
  const [time, setTime] = useState(120); 
  const [gameOver, setGameOver] = useState(false); 
  const [mode, setMode] = useState(""); 
  const [attempts, setAttempts] = useState(0); 
  const [matchedCards, setMatchedCards] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const handleStart = () => {
    if (!mode) {
      alert("Please select a mode before starting the game!"); 
      return;
    }
    setStart(true); 
    setGameOver(false); 
    setGameWon(false); 
    setAttempts(0); 
    setMatchedCards(0); 
    setTime(mode == "easy" ? 120 : mode == "medium" ? 180 : 240);
  };

  useEffect(() => {
    let timer;
    if (start && time > 0 && !gameWon) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(timer);
      setGameOver(true);
      setStart(false);
    }
    return () => clearInterval(timer);
  }, [start, time, gameWon]);

  const handleEasyMode = () => setMode("easy");
  const handleMediumMode = () => setMode("medium");
  const handleHardMode = () => setMode("hard");

  const handleWin = () => {
    setGameWon(true);
    setStart(false); 
  };


  const calculateAccuracy = () => {
    if (attempts === 0) return 0;
    const timeFactor = time > 0 ? time / (mode === "easy" ? 120 : mode === "medium" ? 180 : 240) : 0;
    const accuracy = ((matchedCards * 2) / (attempts * 2)) * 100 * timeFactor * 2;
    return accuracy.toFixed(2);
  };

  const handleFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };

  return (
    <div className="header">
      <div className="syun">
        <img src={backround} alt="Logo" className="up" />
        <img src={middle} alt="Logo" className="middle-main" />
        <img src={middle} alt="Logo" className="middle1" />
        <img src={middle} alt="Logo" className="middle2" />
        <img src={middle} alt="Logo" className="middle3" />
        <img src={middle} alt="Logo" className="middle4" />
        <img src={middle} alt="Logo" className="middle5" />
        <img src={down} alt="Logo" className="down" />
      </div>

      <h1 className="heading">
        Discover Armenia <h2>Card Game</h2>{" "}
      </h1>
      {start && (
        <p className="timer">
          Time left: {`${Math.floor(time / 60)}`.padStart(2, 0)}:
          {`${time % 60}`.padStart(2, 0)}
        </p>
      )}

      {!start && !gameOver && !gameWon && (
        <div className="about-container">
          <h2 className="about">About the Game</h2>
          <span style={{ width: "200px" }}>
            Discover Armenia is an engaging card-matching game designed to test
            your memory and concentration skills. Choose from three difficulty
            levels: Easy, Medium, or Hard, and race against the clock to match
            all the cards. Each mode offers a unique challenge with varying time
            limits. Track your progress with real-time stats, including attempts
            and accuracy. Can you beat the timer and uncover all the matches?
            Dive in and explore the beauty of Armenia through this fun and
            interactive game!
          </span>
          <h3>Good Luck!</h3>
        </div>
      )}

      {gameOver && (
        <div className="game-over-container">
          <h1 className="game-over">Game Over</h1>
          <h2 className="you-louse">You loose</h2>
          <button
            className="play-again"
            onClick={() => {
              setGameOver(false);
              handleStart();
            }}
          >
            Play Again
          </button>
        </div>
      )}

      {gameWon && (
        <div className="game-won-container">
          <h1 className="game-won">You Won!</h1>
          <p>
            Time Spent: {`${Math.floor(((mode === "easy" ? 120 : mode === "medium" ? 180 : 240) - time) / 60)}`.padStart(2, 0)}:
            {`${((mode === "easy" ? 120 : mode === "medium" ? 180 : 240) - time) % 60}`.padStart(2, 0)}
          </p>
          <p>Attempts: {attempts}</p>
          <p>Accuracy: {calculateAccuracy()}%</p>
          <button
            className="play-again"
            onClick={() => {
              setGameWon(false);
              handleStart();
            }}
          >
            Play Again
          </button>
        </div>
      )}
      <img
        className="fullscreen"
        src={fullScreen}
        alt="Fullscreen"
        onClick={handleFullscreen}
      />
      <div className="control">
        <div className="modes">
          <button
            className={`easy ${mode === "easy" ? "selected" : ""}`}
            onClick={handleEasyMode}
          >
            Easy
          </button>
          <button
            className={`medium ${mode === "medium" ? "selected" : ""}`}
            onClick={handleMediumMode}
          >
            Medium
          </button>
          <button
            className={`hard ${mode === "hard" ? "selected" : ""}`}
            onClick={handleHardMode}
          >
            Hard
          </button>
        </div>
        <button className="start" onClick={handleStart}>
          Start
        </button>
        <button className="restart" onClick={() => window.location.reload()}>
          Restart
        </button>
      </div>

      {mode === "easy" && start && (
        <EasyMode
          onWin={handleWin}
          setAttempts={setAttempts}
          setMatchedCards={setMatchedCards}
        />
      )}
      {mode === "medium" && start && (
        <MediumMode
          onWin={handleWin}
          setAttempts={setAttempts}
          setMatchedCards={setMatchedCards}
        />
      )}
      {mode === "hard" && start && (
        <HardMode
          onWin={handleWin}
          setAttempts={setAttempts}
          setMatchedCards={setMatchedCards}
        />
      )}
    </div>
  );
};

export default Header;
