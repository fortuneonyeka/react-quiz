const SECONDS_PER_QUESTION = 20

export const initialState = {
  questions: [],

  // loading,error,ready,active,completed
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  answers: {}, // Store answers for each question
  highscore: 0,
  secondsRemaining: null
};
export const reducer = (state, action) => {
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
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION 
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

      case "reStart":
        return {
          ...initialState,questions:state.questions,
          status: "ready"
        }

        case "timer":
          return {
            ...state,
          secondsRemaining: state.secondsRemaining - 1,
          status: state.secondsRemaining === 0 ? "finished" : state.status,
          }

    default:
      throw new Error("Unknown action");
  }
};