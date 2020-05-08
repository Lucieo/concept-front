import React from "react";
import PlayerCardIcon from "components/PlayerIcons/PlayerCardIcon";
import "./Podium.css";

export default function Podium({ gameInfo }) {
  const { gamePoints, players } = gameInfo;
  return (
    <div className="podium__wrapper">
      <p>Le Podium</p>
      {gamePoints
        .sort((a, b) => b.points - a.points)
        .map((point, idx) => {
          const player = players.find((player) => player.id === point.player);
          return (
            <PlayerCardIcon
              player={player}
              size={"small"}
              points={point.points}
              key={idx}
            />
          );
        })}
    </div>
  );
}
