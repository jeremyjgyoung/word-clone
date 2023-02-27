import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [currInput, setCurrInput] = React.useState("");
  const [guessArr, setGuessArr] = React.useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    const newGuess = currInput.toUpperCase();
    setGuessArr([...guessArr, newGuess]);
    console.log("Guess: ", newGuess);
    setCurrInput("");
  };

  return (
    <>
      <form className="guess-input-wrapper" onSubmit={submitHandler}>
        <label htmlFor="guess-input">Enter guess:</label>
        <input
          id="guess-input"
          type="text"
          pattern="\w{5,5}"
          required
          value={currInput}
          onChange={(e) => setCurrInput(e.target.value)}
        />
      </form>
    </>
  );
}

export default Game;
