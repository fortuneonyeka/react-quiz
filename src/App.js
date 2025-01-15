import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Question from "./components/Question";
import StartScreen from "./components/StartScreen";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";

const initialState = {
  questions: [],

  // loading,error,ready,active,completed
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  answers: {}, // Store answers for each question
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
        index: 0, // Reset to the first question
        answer: null, // Clear any previous answers
        points: 0, // Reset points
        answers: {}, // Clear stored answers
      };

    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
        answers: {
          ...state.answers,
          [state.index]: action.payload, // Store the answer for the current question
        },
      };

    case "nextQuestion":
      // Make sure index doesn't exceed the last question and reset answer
      return {
        ...state,
        index: Math.min(state.index + 1),
        answer: state.answers[state.index + 1] ?? null, // Load the stored answer for the next question, if any
      };

    case "prevQuestion":
      // Make sure index doesn't go below the first question
      return {
        ...state,
        index: Math.max(state.index - 1, 0),
        answer: state.answers[state.index - 1] ?? null, // Load the stored answer for the previous question, if any
      };

    default:
      throw new Error("Unknown action");
  }
};

function App() {
  const [{ questions, status, index, answer,points }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // {questions, status, index}

  const numQuestions = questions.length;
  const totalPossiblePoints = questions.reduce((prev, curr) => prev + curr.points, 0)
  

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
          <Progress index={index} numQuestions={numQuestions} points={points} totalPossiblePoints={totalPossiblePoints} answer={answer}/>
            {questions[index] ? (
              <Question
                questions={questions[index]}
                dispatch={dispatch}
                answer={answer}
              />
            ) : (
              <NextButton
                
                text="Restart"
                className="btn btn-ui"
                onClick={() => dispatch({ type: "start" })}
              />
            )}

            {questions[index] && (
              <>
                <NextButton
                  
                  text="Next"
                  className="btn btn-ui"
                  onClick={() => dispatch({ type: "nextQuestion" })}
                  disable={answer === null} // Disable if no answer is provided
                />

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
      </Main>
    </div>
  );
}

export default App;
