import React, { useState } from "react";
import { INIT_GAME } from "graphQL/mutations";
import { useMutation } from "@apollo/react-hooks";
import wordsList from "../../data/words";

export default function SelectWord({ gameInfo }) {
  const gameId = gameInfo.id;
  const [currentWord, setCurrentWord] = useState("");
  const [blocked, setBlocked] = useState(false);

  const [initGame, { loading }] = useMutation(INIT_GAME, {
    variables: {
      gameId,
      currentWord,
    },
  });

  return (
    <div className="container wordselect__container">
      <div className="card wordselect__card">
        <h5 className="center">Choisissez un mot</h5>
        <div className="center">
          <input
            style={{ maxWidth: 500, textAlign: "center", marginBottom: 30 }}
            placeholder="le mot à faire deviner"
            value={currentWord}
            onChange={(e) => setCurrentWord(e.target.value)}
          />
          <button
            className="btn no-inspiration"
            onClick={() =>
              setCurrentWord(
                wordsList[Math.floor(Math.random() * wordsList.length)]
              )
            }
          >
            J'ai pas d'inspiration
          </button>
        </div>
        <button
          className={`btn ${
            (loading || blocked || !currentWord) && "disabled"
          }`}
          onClick={() => {
            setBlocked(true);
            initGame();
          }}
        >
          {(loading || blocked) && (
            <i className="material-icons">access_time</i>
          )}
          ok c'est parti!
        </button>
      </div>
    </div>
  );
}
