import { useState, useReducer } from "react";

const reducer  = (state, action) => {
  if(action.type === "inc") return state + action.payload
  if( action.type === "dec") return state - action.payload
  if (action.type === "setCount") return action.payload
  if (action.type === "reset") return action.payload
}
function DateCounter() {
  const [count, dispatch] = useReducer(reducer, 0);
  const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date("jan 10 2025");
  date.setDate(date.getDate() + count);

  const dec = function () {
   
    dispatch( {type: "dec", payload: step})
  };

  const inc = function () {
    
    dispatch({type: "inc", payload:step})
  };

  const defineCount = function (e) {
   dispatch({type: "setCount", payload: Number(e.target.value)});
  };

  const defineStep = function (e) {
    const newStep = Number(e.target.value);
    setStep(newStep);
  };

  const reset = function () {
    dispatch({type: "reset", payload: 0})
    setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
