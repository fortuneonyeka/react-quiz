import React, { useEffect, useReducer } from "react";
import { initialState, reducer } from "../reducer";
import NextButton from "./NextButton";
import Footer from "./Footer";
import Timer from "./Timer";
import FinishedScreen from "./FinishedScreen";
import Question from "./Question";
import Progress from "./Progress";
import StartScreen from "./StartScreen";
import Loader from "./Loader";
import Error from "./Error";

const Main = () => {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const totalPossiblePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/questions");
        if (!res.ok) throw new Error("Couldn't fetch data");

        const data = await res.json();

        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    };

    fetchData();
  }, []);

  return (
    <main className="main">
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "ready" && (
        <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
      )}
      {status === "active" && (
        <>
          <Progress
            index={index}
            numQuestions={numQuestions}
            points={points}
            totalPossiblePoints={totalPossiblePoints}
            answer={answer}
          />
          {questions[index] && (
            <Question
              questions={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
          )}

          {questions[index] && (
            <>
              {/* Conditionally render "Next" or "Finish" button */}
              {index === numQuestions - 1 && answer !== null ? (
                <NextButton
                  text="Finish"
                  className="btn btn-ui"
                  onClick={() => dispatch({ type: "finish" })}
                />
              ) : (
                index < numQuestions - 1 && (
                  <NextButton
                    text="Next"
                    className="btn btn-ui"
                    onClick={() => dispatch({ type: "nextQuestion" })}
                    disabled={answer === null}
                  />
                )
              )}

              {index > 0 && (
                <NextButton
                  text="Prev"
                  className="btn"
                  onClick={() => dispatch({ type: "prevQuestion" })}
                />
              )}
              <Footer>
                <Timer
                  dispatch={dispatch}
                  secondsRemaining={secondsRemaining}
                />
              </Footer>
            </>
          )}
        </>
      )}
      {status === "finished" && (
        <FinishedScreen
          points={points}
          totalPossiblePoints={totalPossiblePoints}
          dispatch={dispatch}
          highscore={highscore}
        />
      )}
    </main>
  );
};

export default Main;
