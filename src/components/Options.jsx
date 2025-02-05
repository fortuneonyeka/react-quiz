import React from "react";
import { useQuiz } from "../context/QuizContext";

const Options = () => {
  const { questions, index, dispatch, answer } = useQuiz();
  const currentQuestion = questions[index]; // Get the current question

  if (!currentQuestion) return null; // Prevent errors if data isn't loaded

  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {currentQuestion.options.map((option, optionIndex) => (
        <button
          className={`btn btn-option ${
            optionIndex === answer ? "answer" : ""
          } ${
            hasAnswered
              ? optionIndex === currentQuestion.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: optionIndex })}
          disabled={hasAnswered}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
