import React, { useState } from "react";
import requireAuth from "components/requireAuth";
import AdminViews from "components/AdminViews";
import PlayerViews from "components/PlayerViews";
import Podium from "components/Podium";

const ActiveGame = ({ gameInfo, userId }) => {
  const {
    players,
    turnDeck,
    turnPoints,
    turn,
    currentWord,
    gamePoints,
  } = gameInfo;
  const playerPosition = players.map((player) => player.id).indexOf(userId);
  const isTurnAdmin = playerPosition === turn;

  return (
    <div className="active-game">
      {gamePoints.length > 0 && <Podium gameInfo={gameInfo} />}
      {isTurnAdmin ? (
        <AdminViews gameInfo={gameInfo} userId={userId} />
      ) : (
        <PlayerViews gameInfo={gameInfo} userId={userId} />
      )}
    </div>
  );
};

export default requireAuth(ActiveGame);
