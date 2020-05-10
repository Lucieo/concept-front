import React, { useState } from "react";
import { GUESS_UPDATE } from "graphQL/subscriptions";
import { GUESS_ACTION } from "graphQL/mutations";
import { useSubscription, useMutation } from "@apollo/react-hooks";
import HasWon from "components/HasWon";
import PlayerAnswer from "components/PlayerAnswer";

import "./Admin.css";

export default function PropositionsFeedBack({ gameInfo }) {
  const { players, turn } = gameInfo;
  const gameId = gameInfo.id;
  const [feedBack, setFeedBack] = useState([]);
  const [winner, setWinner] = useState();
  const [quitTurn] = useMutation(GUESS_ACTION, {
    variables: { gameId, word: "", action: "stopTurn" },
  });
  const guessSubscription = useSubscription(GUESS_UPDATE, {
    variables: { gameId },
    onSubscriptionData: ({ client, subscriptionData }) => {
      const data = subscriptionData.data.guessUpdate;
      console.log("GUESS GAME RECEIVED", data);
      setFeedBack([data, ...feedBack]);
      if (data.winner) {
        setWinner(data);
      }
    },
    onError(...error) {
      console.log(error);
    },
  });
  return (
    <>
      <button onClick={quitTurn} className="btn">
        Arrêter le tour
      </button>
      <div className="adminFeedBack__wrapper">
        <p className="adminFeedBack__title">Les réponses des joueurs</p>
        <hr />
        <div>
          {feedBack.length > 0 ? (
            feedBack.map((proposition, idx) => (
              <PlayerAnswer {...proposition} key={idx} />
            ))
          ) : (
            <p>Aucune proposition pour le moment</p>
          )}
        </div>
        {winner && (
          <HasWon
            {...winner}
            turnMaster={players[turn]}
            isTurnMaster={true}
            gameId={gameId}
          />
        )}
      </div>
    </>
  );
}
