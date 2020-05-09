import React, { useState } from "react";
import ChatBox from "./ChatBox";
import ConceptDisplay from "./ConceptsDisplay";
import "./PlayerView.css";

export default function PlayerViews({ gameInfo, userId }) {
  return (
    <div className="playerView__wrapper">
      <ChatBox gameInfo={gameInfo} />
      <ConceptDisplay gameInfo={gameInfo} />
    </div>
  );
}
