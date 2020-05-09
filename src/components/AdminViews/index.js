import React, { useState, useEffect } from "react";
import SelectWord from "components/AdminViews/SelectWord";
import SelectConcepts from "components/AdminViews/SelectConcepts";
import "./Admin.css";

export default function AdminViews({ gameInfo, userId }) {
  const gameId = gameInfo.id;
  const [turnCards, setTurnCards] = useState(gameInfo.turnDeck);
  const [turnVotes, setTurnVotes] = useState(gameInfo.turnVotes);

  useEffect(() => {
    setTurnCards(gameInfo.turnDeck);
  }, [gameInfo.turnDeck]);

  const selectAdminControls = () => {
    if (gameInfo.step === "selectWord")
      return <SelectWord gameInfo={gameInfo} userId={userId} />;
    else if (gameInfo.step === "selectConcepts")
      return <SelectConcepts gameInfo={gameInfo} userId={userId} />;
  };

  return <div>{selectAdminControls()}</div>;
}
