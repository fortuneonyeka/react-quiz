import Header from "./components/Header";
import Main from "./components/Main";
import { QuizContextProvider } from "./context/QuizContext";

function App() {
  return (
    <div className="app">

      <QuizContextProvider>
      <Header />

      <Main />
      </QuizContextProvider>
    </div>
  );
}

export default App;
