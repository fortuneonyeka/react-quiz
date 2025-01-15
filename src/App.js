import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Question from "./components/Question";
import StartScreen from "./components/StartScreen";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishedScreen from "./components/FinishedScreen";

const initialState = {
  questions: [],

  // loading,error,ready,active,completed
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  answers: {}, // Store answers for each question
  highscore: 0
};
const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    case "start":
      return {
        ...state,
        status: "active",
        index: 0,
        answer: null,
        points: 0,
        answers: {},
      };

    case "newAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
        answers: {
          ...state.answers,
          [state.index]: action.payload,
        },
      };

    case "nextQuestion":
      return {
        ...state,
        index: Math.min(state.index + 1, state.questions.length - 1),
        answer: state.answers[state.index + 1] ?? null,
      };

    case "prevQuestion":
      return {
        ...state,
        index: Math.max(state.index - 1, 0),
        answer: state.answers[state.index - 1] ?? null,
      };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore: state.points > state.highscore ? state.points: state.highscore
      };

    default:
      throw new Error("Unknown action");
  }
};

function App() {
  const [{ questions, status, index, answer, points, highscore }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numQuestions = questions.length; // This should be 15
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
    <div className="app">
      <Header />

      <Main>
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

                {/* Prev Button */}
                {index > 0 && (
                  <NextButton
                    text="Prev"
                    className="btn"
                    onClick={() => dispatch({ type: "prevQuestion" })}
                  />
                )}
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
      </Main>
    </div>
  );
}

export default App;
