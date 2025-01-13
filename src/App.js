import { useEffect, useReducer } from "react";
import DateCounter from "./components/DateCounter";
import Header from "./components/Header";
import Main from "./components/Main";


const initialState = {
  question:[],

  // loading,error,ready,active,completed
  status: "loading",
}
const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return{
        ...state,
        questions: action.payload,
        status: "ready"
      };

      case "dataFailed":
      return {
        ...state, status: "error"
      };

      case "questionActive":
        return {
          ...state,
          activeQuestionIndex: action.payload,
          status: "active"
        }
      
  
    default:
      throw new Error("Unknown action")
  }
}
function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const fetchData = async() => {
      try {
        const res = await fetch("http://localhost:8000/questions")
        if (!res.ok) {
          throw new Error("Couldn't fetch data")
        }
        const data = await res.json()
        console.log(data)
        dispatch({type:"dataReceived", payload:data})
        

      } catch (error) {
        dispatch({type:"dataFailed"})
       
      }
    }

    fetchData()
  },[])

  
  return (
    <div className="app">
      {/* <DateCounter /> */}
      <Header />

      <Main />
    </div>
  );
}

export default App;
