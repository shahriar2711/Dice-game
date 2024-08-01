import React, { useState } from 'react'
import TotalScore from './TotalScore'
import NumberSelector from './NumberSelector'
import styled from 'styled-components'
import RoleDice from './RoleDice'
import Rules from './Rules'
import { Button } from "../styled/Button";

const GamePlay = () => {

  const [selectedNumber , setSelectedNumber] = useState();

  const [currentDice , setCurrentDice] = useState(1);

  const [score , setScore] = useState(0);

  const [error , setError] = useState("");

  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false); 

  const [showRules , setShowRules] = useState(false);

  const generateRandomNumber = (min , max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const roleDice = () => {
    if(!selectedNumber){
      setError("You have not selected any number");
      return;
    }

    const randomNumber = generateRandomNumber(1,7);
    setCurrentDice((prev) => randomNumber);


    if(selectedNumber === randomNumber){
      setScore((prev) => prev + randomNumber);
      setMessage("Correct Guess! You scored " + randomNumber + " points.");
      setIsCorrect(true);
    }else{
      setScore((prev) => prev - 2);
      setMessage("Wrong Guess! You lost 2 points.");
      setIsCorrect(false);
    }

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 1000);

    setSelectedNumber(undefined);
  }

  const resetScore = () => {
    setScore(0);
  }
  return (
    <ManContainer>
      {showMessage && <Message isCorrect={isCorrect}>{message}</Message>}
      <div className='top_section'>
      <TotalScore score={score} />
      <NumberSelector
        error={error}
        setError={setError}
        selectedNumber={selectedNumber}
        setSelectedNumber={setSelectedNumber}  
      />
      </div>
      <RoleDice
        currentDice={currentDice}
        roleDice={roleDice}
      />
      <div className="btns">
        <Button onClick={resetScore}>Reset Score</Button>
        <Button onClick={() => setShowRules((prev) => !prev)}>
          {showRules ? "Hide" : "Show"} Rules
        </Button>
      </div>

      {showRules && <Rules/>}
    </ManContainer>
  )
}

export default GamePlay

const ManContainer = styled.main`

  padding : 50px ;
  .top_section{
    display: flex;
    justify-content: space-around;
    align-items: end;
  }
  .btns{
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
`;

const Message = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${(props) => (props.isCorrect ? 'green' : 'red')};
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1000;
`;