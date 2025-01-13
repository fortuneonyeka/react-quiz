import React from 'react'

const Options = ({questions}) => {
  return (
    <div className="options">
        {questions.options.map((option) => <button className="btn btn-option" key={option}>{option}</button>)}
      </div>
  )
}

export default Options
