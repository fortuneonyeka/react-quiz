import React from 'react'

const Progress = ({index, numQuestions,points, totalPossiblePoints, answer}) => {
  return (
    <header className='progress'>
      <progress max={numQuestions} value={index + Number(answer !== null)}/>

      <p>Question <strong>{index + 1}</strong> / {numQuestions}</p>
      <p><strong>{points}</strong> / {totalPossiblePoints}</p>
    </header>
  )
}

export default Progress
