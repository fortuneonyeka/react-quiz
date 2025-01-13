import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Question from "./components/Question";
import StartScreen from "./components/StartScreen";

const initialState = {
  questions: [],

  // loading,error,ready,active,completed
  status: "loading",
  index: 0
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
      status: "active"
    }

    default:
      throw new Error("Unknown action");
  }
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // {questions, status,index}

  const numQuestions = state.questions.length;

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
        {state.status === "loading" && <Loader />}
        {state.status === "error" && <Error />}
        {state.status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch}/>}
        {state.status === "active" && <Question questions={state.questions[state.index]}/>}
      </Main>
    </div>
  );
}

export default App;
