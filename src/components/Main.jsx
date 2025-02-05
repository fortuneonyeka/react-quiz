import NextButton from "./NextButton";
import Footer from "./Footer";
import Timer from "./Timer";
import FinishedScreen from "./FinishedScreen";
import Question from "./Question";
import Progress from "./Progress";
import StartScreen from "./StartScreen";
import Loader from "./Loader";
import Error from "./Error";
import { useQuiz } from "../context/QuizContext";

const Main = () => {
  const { status, questions, index, numQuestions, answer, dispatch } =
    useQuiz();

  return (
    <main className="main">
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "ready" && <StartScreen />}
      {status === "active" && (
        <>
          <Progress />
          {questions[index] && <Question />}

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
                <Timer />
              </Footer>
            </>
          )}
        </>
      )}
      {status === "finished" && <FinishedScreen />}
    </main>
  );
};

export default Main;
