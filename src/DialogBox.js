import React from "react";
function DialogBox(props) {
  return (
    <div className="DialogBox">
      <div className="DialogHeader">
        <h1>You Won the Game</h1>
        <br />
        <h1>You Score is {props.moves} </h1>
        <h1> BestScore is : {props.BestScore}</h1>
      </div>
      <div className="Dialogfooter">
        <button onClick={props.onRestart}>Play Again?</button>
      </div>
    </div>
  );
}
export default DialogBox;
