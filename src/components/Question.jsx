import React from "react";
import Options from "./Options";
import { useQuiz } from "../context/QuizContext";

const Question = () => {
  const { questions } = useQuiz();
  return (
    <div>
      <h4>{questions.question}</h4>

      <Options />
    </div>
  );
};

export default Question;
