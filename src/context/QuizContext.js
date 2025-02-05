import { Children, createContext, useContext, useEffect, useReducer } from "react";
import { initialState, reducer } from "../reducer";

const QuizContext = createContext()

const QuizContextProvider = ({children}) => {
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

  return(
    <QuizContext.Provider value={{questions,status,index,answer,points,highscore,secondsRemaining,numQuestions,totalPossiblePoints,dispatch}}>
      {children}
    </QuizContext.Provider>
  )
}

const useQuiz = () => {
  const context = useContext(QuizContext)
  if (context === undefined) {
    throw new Error("QuizContext must be used inside QuizContextProvider")
  }
  return context
}

export {QuizContextProvider,useQuiz}