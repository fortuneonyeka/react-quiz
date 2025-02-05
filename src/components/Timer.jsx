import React, { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";

const Timer = () => {
  const { dispatch, secondsRemaining } = useQuiz()
  
  const min = Math.floor(secondsRemaining / 60);
  const sec = secondsRemaining % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "timer" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch, secondsRemaining]);
  return (
    <div className="timer">
      {min < 10 && 0}
      {min} : {sec < 10 && 0}
      {sec}
    </div>
  );
};

export default Timer;
