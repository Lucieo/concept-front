import React, { useState, useEffect } from "react";
import SelectPlayerDeck from "components/PlayerViews/PlayerDeck/SelectPlayerDeck";
import VotePlayerDeck from "components/PlayerViews/PlayerDeck/VotePlayerDeck";
import PointsDisplay from "components/PlayerViews/PointsDisplay";
import WaitForInit from "components/PlayerViews/WaitForInit";
import { useSubscription } from "@apollo/react-hooks";
import { GAME_ACTION } from "graphQL/subscriptions";
import Loading from "components/Loading";
import { GET_DECK } from "graphQL/queries";
import { useQuery } from "@apollo/react-hooks";

export default function PlayerViews({ gameInfo, userId }) {
  const [turnDeck, setTurnDeck] = useState(gameInfo.turnDeck);
  const [turnVotes, setTurnVotes] = useState(gameInfo.turnVotes);
  const { dataSub, loadingSub } = useSubscription(GAME_ACTION, {
    variables: { gameId: gameInfo.id },
    onSubscriptionData: ({ client, subscriptionData }) => {
      const data = subscriptionData.data.gameAction;
      console.log("NEW GAME ACTION RECEIVED", data);
      if (data.actionType === "submitCard") {
        setTurnDeck([...turnDeck, data.action]);
      } else {
        setTurnVotes([...turnVotes, data.action]);
      }
    },
    onError(...error) {
      console.log(error);
    },
  });

  const selectGameView = () => {
    if (gameInfo.step === "init") return <WaitForInit gameInfo={gameInfo} />;
    if (gameInfo.step === "select")
      return (
        <SelectPlayerDeck
          gameInfo={gameInfo}
          userId={userId}
          turnDeck={turnDeck}
        />
      );
    if (gameInfo.step === "vote")
      return (
        <VotePlayerDeck
          gameInfo={gameInfo}
          userId={userId}
          turnVotes={turnVotes}
        />
      );
    if (gameInfo.step === "evaluate")
      return <PointsDisplay gameInfo={gameInfo} userId={userId} />;
  };
  return <div>{selectGameView()}</div>;
}
