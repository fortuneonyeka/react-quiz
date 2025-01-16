import React from "react";

const Options = ({ questions, dispatch, answer }) => {
  const hansAnswered = answer !== null;

  return (
    <div className="options">
      {questions.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hansAnswered
              ? index === questions.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={hansAnswered}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
