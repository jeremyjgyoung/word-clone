import React from "react";

import { sample, range } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [currInput, setCurrInput] = React.useState("");
  const [guessArr, setGuessArr] = React.useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    const guessId = crypto.randomUUID();
    const newGuess = currInput.toUpperCase();
    setGuessArr([...guessArr, { id: guessId, guess: newGuess }]);
    console.log("Guess: ", newGuess);
    setCurrInput("");
  };

  return (
    <>
      <div class="guess-results">
        {guessArr.map((word) => (
          <p class="guess" key={word.id}>
            {word.guess}
          </p>
        ))}
      </div>

      <div class="guess-results">
        {range(NUM_OF_GUESSES_ALLOWED).map((rowIndex) => (
          <p key={rowIndex} className="guess">
            {range(5).map((colIndex) => (
              <>
                {guessArr[colIndex] ? (
                  <span key={colIndex} className="cell">
                    T
                  </span>
                ) : (
                  <span key={colIndex} className="cell"></span>
                )}
              </>
            ))}
          </p>
        ))}
      </div>

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
