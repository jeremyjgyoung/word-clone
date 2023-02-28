import React from "react";

import { sample, range } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { checkGuess } from "../../game-helpers";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [currInput, setCurrInput] = React.useState("");
  const [guessArr, setGuessArr] = React.useState([]);
  const [final, setFinal] = React.useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const guessId = crypto.randomUUID();
    const newGuess = currInput.toUpperCase();
    const letterCheckedArr = checkGuess(newGuess, answer);
    setGuessArr([
      ...guessArr,
      { id: guessId, guess: newGuess, letterArr: letterCheckedArr },
    ]);
    console.log("Guess: ", newGuess);
    setCurrInput("");
    if (newGuess === answer) {
      setFinal("win");
    } else if (guessArr.length + 1 >= 6) {
      setFinal("lose");
    }
  };

  return (
    <>
      {final === "win" ? (
        <div className="happy banner">
          <p>
            <strong>Congratulations!</strong> Got it in{" "}
            <strong>{guessArr.length} guesses</strong>.
          </p>
        </div>
      ) : null}
      {final === "lose" ? (
        <div className="sad banner">
          <p>
            Sorry, the correct answer is <strong>{answer}</strong>.
          </p>
        </div>
      ) : null}
      <div className="guess-results">
        {range(NUM_OF_GUESSES_ALLOWED).map((rowIndex) => (
          <p key={rowIndex} className="guess">
            {guessArr[rowIndex]
              ? guessArr[rowIndex].letterArr.map((letterObj, index) => (
                  <span
                    key={`${guessArr[rowIndex]}${index}`}
                    className={`cell ${letterObj.status}`}
                  >
                    {letterObj.letter}
                  </span>
                ))
              : range(5).map((colIndex) => (
                  <span key={colIndex} className="cell"></span>
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
