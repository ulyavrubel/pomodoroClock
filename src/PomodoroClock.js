import React, { useState, useEffect } from "react";
import { secondsToTime } from "./secondsToTime";
import Circle from "react-circle";

function PomodoroClock() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [text, setText] = useState("Session");
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(25 * 60);

  const beep = React.createRef();

  function reset() {
    setBreakLength(5);
    setSessionLength(25);
    setText("Session");
    setSeconds(25 * 60);
    setRunning(false);
    beep.current.pause();
    beep.current.currentTime = 0;
  }

  function calculateSecondsLeft(length, label) {
    if (!running) {
      if (label === text) {
        setSeconds(length * 60);
      }
    }
  }

  function handleDecrement(length, setLength, label) {
    if (length > 1) {
      setLength(length - 1);
      calculateSecondsLeft(length - 1, label);
    }
  }

  function handleIncrement(length, setLength, label) {
    if (length < 60) {
      setLength(length + 1);
      calculateSecondsLeft(length + 1, label);
    }
  }

  function toggleRunning() {
    setRunning(!running);
  }

  function changeTimer() {
    setSeconds(text === "Session" ? breakLength * 60 : sessionLength * 60);
    setText(text === "Session" ? "Break" : "Session");
  }

  useEffect(() => {
    let interval = null;
    if (running) {
      if (seconds === 0) {
        beep.current.play();
        changeTimer();
      }
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (!running && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running, seconds]);

  const timeLeft = secondsToTime(seconds);
  const progress =
    text === "Session"
      ? seconds / (sessionLength * 60)
      : seconds / (breakLength * 60);

  return (
    <div>
      {" "}
      <header>
        <h1>Pomodoro Clock</h1>
      </header>
      <div id="clock">
        <div id="timer">
          <Circle
            id="circle"
            animate={false} // Boolean: Animated/Static progress
            animationDuration="1s" // String: Length of animation
            responsive={true} // Boolean: Make SVG adapt to parent size
            size="80vh" // String: Defines the size of the circle.
            lineWidth="3" // String: Defines the thickness of the circle's stroke.
            progress={progress * 100} // String: Update to change the progress and percentage.
            progressColor="white" // String: Color of "progress" portion of circle.
            bgColor="rgb(50, 50, 50)" // String: Color of "empty" portion of circle.
            textColor="#6b778c" // String: Color of percentage text color.
            textStyle={{
              font: "bold 4rem Helvetica, Arial, sans-serif" // CSSProperties: Custom styling for percentage.
            }}
            percentSpacing={10} // Number: Adjust spacing of "%" symbol and number.
            roundedStroke={false} // Boolean: Rounded/Flat line ends
            showPercentage={false} // Boolean: Show/hide percentage.
            showPercentageSymbol={false} // Boolean: Show/hide only the "%" symbol.
          />

          <audio id="beep" ref={beep} preload="auto">
            <source
              src="http://soundbible.com/mp3/Intruder%20Alert-SoundBible.com-867759995.mp3"
              type="audio/mpeg"
            ></source>
          </audio>
        </div>

        <div id="controls">
          <div id="session" className="session-break">
            <div id="session-label" className="session-break-label">
              <span>Session Length</span>
            </div>

            <div
              className="decrement"
              id="session-decrement"
              onClick={() =>
                handleDecrement(sessionLength, setSessionLength, "Session")
              }
            ></div>
            <span id="session-length" className="session-break-length">
              {sessionLength}
            </span>
            <div
              className="increment"
              id="session-increment"
              onClick={() =>
                handleIncrement(sessionLength, setSessionLength, "Session")
              }
            ></div>
          </div>
          <div id="inside-circle">
            <span id="timer-label">{text}</span>

            <span id="time-left">
              {timeLeft.minutes + ":" + timeLeft.seconds}
            </span>
            <div id="inside-circle-buttons">
              <div
                id="start_stop"
                onClick={toggleRunning}
                className={running ? "pause" : "start"}
              ></div>

              <div id="reset" onClick={reset}></div>
            </div>
          </div>
          <div id="break" className="session-break">
            <div id="break-label" className="session-break-label">
              <span>Break Length</span>
            </div>

            <div
              className="decrement"
              id="break-decrement"
              onClick={() =>
                handleDecrement(breakLength, setBreakLength, "Break")
              }
            ></div>
            <span id="break-length" className="session-break-length">
              {breakLength}
            </span>

            <div
              className="increment"
              id="break-increment"
              onClick={() =>
                handleIncrement(breakLength, setBreakLength, "Break")
              }
            ></div>
          </div>
        </div>
      </div>
      <footer>
        <h5>
          Created by <a href="https://github.com/ulyavrubel/">Ulyana Sichkar</a>
        </h5>
      </footer>
    </div>
  );
}

export default PomodoroClock;
