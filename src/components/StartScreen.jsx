import React from "react";
import { useQuiz } from "../context/QuizContext";

const StartScreen = () => {
  const { numQuestions, dispatch } = useQuiz()
  return (
    <div className="start">
      <h2>Welcome To The React Quiz</h2>
      <h3>{numQuestions} questions to test your React Mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}>
        Let's go!
      </button>
    </div>
  );
};

export default StartScreen;
