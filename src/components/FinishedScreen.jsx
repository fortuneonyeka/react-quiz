import React from "react";
import NextButton from "./NextButton";
import { useQuiz } from "../context/QuizContext";

const FinishedScreen = () => {
  const { points, totalPossiblePoints, dispatch, highscore } = useQuiz()
  const percentage = (points / totalPossiblePoints) * 100;
  const roundedPercentage = Math.ceil(percentage)
 let emoji;

 if(percentage === 100) emoji = "🥇"
 if(percentage >= 80 && percentage < 100) emoji = "🎉"
 if(percentage >= 50 && percentage < 80) emoji = "🤔"
 if(percentage > 0 && percentage < 50) emoji = "🤦"

  return (
    <>
      <p className="result">
       <span>{emoji}</span> You scored <strong>{points}</strong> out of {totalPossiblePoints} (
        {roundedPercentage}%)
      </p>

      <p className="highscore">(Highscore: {highscore} points)</p>

       <NextButton
        text="Restart Quiz"
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reStart" })}
      />
    </>
  );
};

export default FinishedScreen;
