import React, { useEffect, useState, useCallback } from "react";
import DialogBox from "./DialogBox";
import "./App.css";
const values = [1, 2, 3, 4, 5, 6, 7, 8];
function App() {
  const [moves, setMoves] = useState(0);
  const [cards, setCards] = useState([]);
  const [openCard, setopenCard] = useState([]);
  const [clearedcard, setclearedcard] = useState([]);
  const [isgamecompleted, setisgamecompleted] = useState(false);
  const [BestScore, setBestScore] = useState(
    parseInt(window.localStorage.getItem("BestScore")) || Infinity
  );

  const intializeCards = useCallback(() => {
    const pair = values.concat(values);
    const shufflePair = shuffledArray(pair);
    const initialCards = shufflePair.map((value, index) => ({
      id: index,
      value: value,
      matched: false,
      opened: false,
    }));
    setCards([...initialCards]);
    setMoves(0);
  }, []);
  useEffect(() => {
    intializeCards();
  }, [intializeCards]);
  const shuffledArray = (Array) => {
    const shuffle = Array;
    for (let i = shuffle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffle[i], shuffle[j]] = [shuffle[j], shuffle[i]];
    }
    return shuffle;
  };

  function handleclick(id) {
    const clickedCard = cards.find((card) => card.id === id);
    if (clickedCard.opened === true) {
      return;
    }
    setopenCard((prevOpenCard) => [...prevOpenCard, clickedCard]);
    const updatecards = cards.map((card) => {
      if (card.id === id) {
        return { ...card, opened: true };
      } else {
        return card;
      }
    });

    setCards(updatecards);
    setMoves((move) => move + 1);

    // console.log("clicked", openCard);
    // // console.log(openCard);
    // if (openCard.length >= 2) {
    //   // checkmatch();
    //   // setopenCard([]);
    //   set
    // }
  }

  const checkmatch = () => {
    console.log("check match");
    const card1 = openCard[0];
    const card2 = openCard[1];
    console.log(card1, card2);
    if (card1.value === card2.value) {
      const updatecards = cards.map((card) =>
        card.id === card1.id || card.id === card2.id
          ? { ...card, matched: true }
          : card
      );
      setCards(updatecards);
      setopenCard([]);
      console.log("matched");
      setclearedcard((prev) => ({ ...prev, [card1.id]: true }));
    } else {
      const updatecards = cards.map((card) =>
        card.id === card1.id || card.id === card2.id
          ? { ...card, opened: false }
          : card
      );
      setCards(updatecards);
      setopenCard([]);
      console.log("unmatched");
    }
  };
  // useEffect(() => {
  //   console.log("Moves updated:", moves);
  // }, [moves]);
  useEffect(() => {
    if (openCard.length === 2) {
      setTimeout(checkmatch, 500);
    }
  });
  useEffect(() => {
    const clearedCardKeys = Object.keys(clearedcard);
    if (clearedCardKeys.length === values.length) {
      const currentScore = moves;
      const previousScore =
        parseInt(window.localStorage.getItem("BestScore")) || Infinity;
      setisgamecompleted(true);

      if (currentScore < previousScore) {
        window.localStorage.setItem("BestScore", currentScore.toString());
        console.log("New best score:", currentScore);
        setBestScore(currentScore);
      }
    }
  }, [clearedcard, moves]);

  function handleRestart() {
    intializeCards();
    setMoves(0);
    setopenCard([]);
    setclearedcard({});
    setisgamecompleted(false);
  }

  return (
    <>
      <div className="Display">
        <div className="Heading">
          <h3>Welcome to memory game</h3>
          <p>{`Total Moves:${moves}`}</p>
          <button onClick={handleRestart}>Reset Game</button>
          <br />
        </div>
        <div className="cardDisplay">
          {cards.map((card) => (
            <div
              id={card.value}
              key={card.id}
              // className="card"
              onClick={() => handleclick(card.id)}
              className={`card ${card.opened ? "opened" : ""} ${
                card.matched ? "matched" : ""
              }`}
            >
              <div className="cardContent">
                {" "}
                {card.opened ? card.value : "clickme"}
              </div>
            </div>
          ))}
        </div>
        {isgamecompleted && (
          <DialogBox
            onRestart={handleRestart}
            moves={moves}
            BestScore={BestScore}
          />
        )}{" "}
      </div>
    </>
  );
}

export default App;
