import React from "react";
import "./HasWon.css";
import { NEXT_TURN } from "graphQL/mutations";
import { useMutation } from "@apollo/react-hooks";

export default function HasWon({
  player,
  currentWord,
  turnMaster,
  isTurnMaster = false,
  gameId = undefined,
}) {
  const [nextTurn] = useMutation(NEXT_TURN, { variables: { gameId } });
  return (
    <div className="overlay">
      <div className="card hasWon__card">
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
        {isTurnMaster && (
          <button className="btn" onClick={nextTurn}>
            Passer au prochain tour
          </button>
        )}
      </div>
    </div>
  );
}
