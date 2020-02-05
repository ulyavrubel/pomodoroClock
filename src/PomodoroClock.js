import React, { useState, useEffect } from "react";

function PomodoroClock() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(null);
  const [running, setRunning] = useState(false);
  const [timer, setTimer] = useState(null);

  function reset() {
    setBreakLength(5);
    setSessionLength(25);
  }

  function breakDecrement() {
    setBreakLength(prevBreakLength => prevBreakLength - 1);
  }

  function breakIncrement() {
    setBreakLength(prevBreakLength => prevBreakLength + 1);
  }

  function sessionDecrement() {
    setSessionLength(prevSessionLength => prevSessionLength - 1);
  }

  function sessionIncrement() {
    setSessionLength(prevSessionLength => prevSessionLength + 1);
  }

  //https://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss
  function timerString(minutes) {
    var date = new Date(null);
    date.setSeconds(minutes * 60); // specify value for SECONDS here
    return date.toISOString().substr(14, 5);
  }

  function timerStringDecrement(str) {
    let newArr = str.split(":");
    var date = new Date(null);
    date.setSeconds(Number(newArr[0]) * 60 + Number(newArr[1]) - 1);
    return date.toISOString().substr(14, 5);
  }

  useEffect(() => {
    setTimeLeft(timerString(sessionLength));
  }, [sessionLength]);

  function startRunning() {
    setTimer(
      setInterval(() => {
        setTimeLeft(prevTimeLeft => {
          return timerStringDecrement(prevTimeLeft);
        });
      }, 1000)
    );
    setRunning(prevRunning => !prevRunning);
  }

  function stopRunning() {
    clearInterval(timer);
    setRunning(false);
  }

  return (
    <div>
      <div id="break">
        <div id="break-label">
          <span>Break Length</span>
        </div>
        <button
          id="break-decrement"
          onClick={breakLength > 0 ? breakDecrement : null}
        >
          Dec
        </button>
        <span id="break-length">{breakLength}</span>
        <button
          id="break-increment"
          onClick={breakLength < 60 ? breakIncrement : null}
        >
          Inc
        </button>
      </div>
      <div id="session">
        <div id="session-label">
          <span>Session Length</span>
        </div>
        <button
          id="session-decrement"
          onClick={sessionLength > 0 ? sessionDecrement : null}
        >
          Dec
        </button>
        <span id="session-length">{sessionLength}</span>
        <button
          id="session-increment"
          onClick={sessionLength < 60 ? sessionIncrement : null}
        >
          Inc
        </button>
      </div>
      <div id="timer">
        <span id="timer-label">Session</span>
        <br />
        <span id="time-left">{timeLeft}</span>
        <button id="start_stop" onClick={running ? stopRunning : startRunning}>
          Start/Stop
        </button>
        <button id="reset" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default PomodoroClock;
