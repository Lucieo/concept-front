import React from "react";
import PlayerCardIcon from "components/PlayerIcons/PlayerCardIcon";
import "./Podium.css";

export default function Podium({ gamePoints }) {
  return (
    <div className="podium__wrapper">
      {gamePoints
        .sort((a, b) => b.points - a.points)
        .map((point, idx) => {
          return (
            <PlayerCardIcon
              player={point.player}
              size={"small"}
              points={point.points}
              key={idx}
            />
          );
        })}
    </div>
  );
}
