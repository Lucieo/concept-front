import React, { useState } from "react";
import ChatBox from "./ChatBox";
import ConceptDisplay from "./ConceptsDisplay";
import "./PlayerView.css";
import Clock from "images/clock.svg";
import Loading from "components/Loading";

export default function PlayerViews({ gameInfo, userId }) {
  const turnMaster = gameInfo.players[gameInfo.turn];
  const selectView = () => {
    if (gameInfo.step === "selectConcepts") {
      return (
        <>
          <ChatBox gameInfo={gameInfo} />
          <ConceptDisplay gameInfo={gameInfo} />
        </>
      );
    } else if (gameInfo.step === "selectWord") {
      return <WaitingForWord turnMaster={turnMaster} />;
    } else if (gameInfo.step === "turnWon") {
      return <TurnWon turnMaster={turnMaster} />;
    } else {
      return <Loading />;
    }
  };
  return <div className="playerView__wrapper">{selectView()}</div>;
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

const TurnWon = ({ turnMaster }) => {
  return (
    <div className="playerView__wait">
      <img src={Clock} style={{ width: 100, height: 100 }} />
      <p>Cette manche a déjà été remportée...</p>
      <img
        style={{ width: 100, height: 100 }}
        src={`../images/players/${turnMaster.icon}.png`}
      />
      <p>Attendez que {turnMaster.name} passe au prochain tour</p>
    </div>
  );
};
