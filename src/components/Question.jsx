import React from "react";
import Options from "./Options";

const Question = ({questions, dispatch,answer}) => {
 console.log(questions);
 

  return (
    <div>
      <h4>{questions.question}</h4>

      <Options questions={questions} dispatch={dispatch} answer={answer}/>
    </div>
  );
};

export default Question;
