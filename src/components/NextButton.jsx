import React from 'react'

const NextButton = ({text, className, onClick, disable}) => {
  
  return (
   <button className={className} disabled={disable} onClick={onClick}>{text}</button>
  )
}

export default NextButton
