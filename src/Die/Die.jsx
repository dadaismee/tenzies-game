import React from 'react'
import "./Die.css"

const Die = (props) => {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
  }
  
  return (
    <div 
      className='Die' 
      style={styles}
      onClick={props.holdDice}
    >
      <h2 className='Die__value'>{props.value}</h2>
    </div>
  )
}

export default Die