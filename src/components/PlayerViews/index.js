import React, { useState } from "react";
import ChatBox from "./ChatBox";
import ConceptDisplay from "./ConceptsDisplay";
import "./PlayerView.css";

export default function PlayerViews({ gameInfo, userId }) {
  const turnMaster = gameInfo.players[gameInfo.turn];
  return (
    <div className="playerView__wrapper">
      {gameInfo.step === "selectConcepts" ? (
        <>
          <ChatBox gameInfo={gameInfo} />
          <ConceptDisplay gameInfo={gameInfo} />
        </>
      ) : (
        <WaitingForWord turnMaster={turnMaster} />
      )}
    </div>
  );
}

const WaitingForWord = ({ turnMaster }) => {
  return (
    <div className="playerView__wait">
      <img
        className="playerView__waiticon"
        style={{ width: 100, height: 100 }}
        src={`../images/players/${turnMaster.icon}.png`}
      />
      <p>Attendez que {turnMaster.name} choisisse un mot...</p>
    </div>
  );
};
