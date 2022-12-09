import React from 'react'
import "./App.css"
import Die from "./Die/Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

const App = () => {
  const [dice, setDice] = React.useState(allNewDice);
  const [tenzies, setTenzies] = React.useState(false);
  
  React.useEffect(() => {
    const areEqual = dice.every(die => die.value === dice[0].value);
    const areHeld = dice.every(die => die.isHeld);
  
    if (areEqual && areHeld) {
      setTenzies(true)
    }
  }, [dice]);

  function allNewDice() {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      });
    };
    return arr;
  }

  function holdDice(id) {
    setDice(prevState => prevState.map(
      die => die.id === id ?
        {...die, isHeld: !die.isHeld} : die
      ))
  }

  const diceNumbers = dice.map(die => (
          <Die 
            key={die.id}
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
          />
        ));

  function rollDice() {
    if (!tenzies) {
      setDice(prevState => prevState.map(
        die => die.isHeld ? die : {
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
        }
      ));
    } else {
      setTenzies(false)
      setDice(allNewDice());
    }
  }

  return (
    <div className='App'>
      {Boolean(tenzies) && <Confetti />}
      <h1 className="App__title">Tenzies</h1>
      <p className="App__instructions">Roll until all dice are the same. 
          Click each die to freeze it at its current value between rolls.</p>
      <div className="App__die-container">
        {diceNumbers}
      </div>
      <button 
        onClick={rollDice}
        className="App__roll-button">
        {tenzies ? "New game" : "Roll"}
      </button>
    </div>
  )
}

export default App