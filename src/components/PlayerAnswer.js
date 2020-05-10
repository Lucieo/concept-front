import React from "react";

export default ({ player, word }) => {
  return (
    <>
      {player && (
        <div>
          <img
            style={{ width: 25, height: 25 }}
            src={`../images/players/${player.icon}.png`}
          />
          <span> {player.name} :</span>
          <span> {word}</span>
        </div>
      )}
    </>
  );
};
