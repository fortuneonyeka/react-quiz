import React from "react";
import NextButton from "./NextButton";

const FinishedScreen = ({ points, totalPossiblePoints, dispatch, highscore }) => {
  const percentage = (points / totalPossiblePoints) * 100;
 let emoji;

 if(percentage === 100) emoji = "🥇"
 if(percentage >= 80 && percentage < 100) emoji = "🎉"
 if(percentage >= 50 && percentage < 80) emoji = "🤔"
 if(percentage > 0 && percentage < 50) emoji = "🤦"

  return (
    <>
      <p className="result">
       <span>{emoji}</span> You scored <strong>{points}</strong> out of {totalPossiblePoints} (
        {Math.ceil(percentage)}%)
      </p>

      <p className="highscore">(Highscore: {highscore} points)</p>

       <NextButton
        text="Restart Quiz"
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      />
    </>
  );
};

export default FinishedScreen;
