import React, { useState } from "react";
import "./HasWon.css";
import { NEXT_TURN } from "graphQL/mutations";
import { useMutation } from "@apollo/react-hooks";
import { ReactComponent as Sad } from "images/sad.svg";
import Loose from "sounds/loose.wav";
import Win from "sounds/win.mp3";

export default function HasWon({
  player,
  currentWord,
  turnMaster,
  isTurnMaster = false,
  gameId = undefined,
}) {
  const [nextTurn, { loading }] = useMutation(NEXT_TURN, {
    variables: { gameId },
  });
  const [blocked, setBlocked] = useState(false);
  return (
    <div className="overlay">
      <div className="card hasWon__card">
        {player ? (
          <>
            <audio src={Win} autoPlay={true} />
            <img
              style={{ width: 60, height: 60 }}
              src={`../images/players/${player.icon}.png`}
            />
            <h5>{player.name} a trouvé!</h5>
            <p>le mot était</p>
            <h4>{currentWord}</h4>
            <p>
              {player.name} gagne 2 points, {turnMaster.name} gagne 1 point.
            </p>
          </>
        ) : (
          <>
            <audio src={Loose} autoPlay={true} />
            <Sad style={{ height: 80, width: 80 }} />
            <h6>dommage pas de gagnant pour ce tour</h6>
            <p>le mot à trouver était</p>
            <h4>{currentWord}</h4>
          </>
        )}
        {isTurnMaster && (
          <button
            className={`btn ${(blocked || loading) && "disabled"}`}
            onClick={() => {
              setBlocked(true);
              nextTurn();
            }}
          >
            {(blocked || loading) && (
              <i className="material-icons">access_time</i>
            )}
            Passer au prochain tour
          </button>
        )}
      </div>
    </div>
  );
}
