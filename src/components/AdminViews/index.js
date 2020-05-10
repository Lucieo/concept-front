import React, { useState, useEffect } from "react";
import SelectWord from "components/AdminViews/SelectWord";
import SelectConcepts from "components/AdminViews/SelectConcepts";
import "./Admin.css";
import { NEXT_TURN } from "graphQL/mutations";
import { useMutation } from "@apollo/react-hooks";
import Clock from "images/clock.svg";

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
    else if (gameInfo.step === "turnWon")
      return (
        <TurnWon
          turnMaster={gameInfo.players[gameInfo.turn]}
          gameId={gameInfo.id}
        />
      );
  };

  return <div>{selectAdminControls()}</div>;
}

const TurnWon = ({ turnMaster, gameId }) => {
  const [nextTurn, { loading }] = useMutation(NEXT_TURN, {
    variables: { gameId },
  });
  const [blocked, setBlocked] = useState(false);
  return (
    <div className="playerView__wait">
      <img src={Clock} style={{ width: 100, height: 100 }} />
      <p>Cette manche a déjà été remportée...</p>
      <p>Passez au au prochain tour pour continuer</p>
      <button
        className={`btn ${(blocked || loading) && "disabled"}`}
        onClick={() => {
          setBlocked(true);
          nextTurn();
        }}
      >
        {(blocked || loading) && <i className="material-icons">access_time</i>}
        Passer au prochain tour
      </button>
    </div>
  );
};
