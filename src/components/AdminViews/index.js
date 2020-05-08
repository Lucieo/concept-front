import React, { useState, useEffect } from "react";
import SelectWord from "components/AdminViews/SelectWord";
import SelectConcepts from "components/AdminViews/SelectConcepts";
import { useSubscription } from "@apollo/react-hooks";
import { useMutation } from "@apollo/react-hooks";
import { GAME_ACTION } from "graphQL/subscriptions";
import { LAUNCH_GAME_STEP } from "graphQL/mutations";
import "./Admin.css";

export default function AdminViews({ gameInfo, userId }) {
  const gameId = gameInfo.id;
  const [turnCards, setTurnCards] = useState(gameInfo.turnDeck);
  const [turnVotes, setTurnVotes] = useState(gameInfo.turnVotes);
  const { dataSub, loadingSub } = useSubscription(GAME_ACTION, {
    variables: { gameId },
    onSubscriptionData: ({ client, subscriptionData }) => {
      const data = subscriptionData.data.gameAction;
      if (data.actionType === "submitCard") {
        setTurnCards([...turnCards, subscriptionData.data.gameAction.action]);
      } else {
        setTurnVotes([...turnVotes, subscriptionData.data.gameAction.action]);
      }
    },
    onError(...error) {
      console.log(error);
    },
  });

  const [nextTurn, { loading }] = useMutation(LAUNCH_GAME_STEP, {
    variables: {
      gameId,
      step: "nextTurn",
      turnMaster: userId,
    },
  });

  useEffect(() => {
    setTurnCards(gameInfo.turnDeck);
  }, [gameInfo.turnDeck]);

  const selectAdminControls = () => {
    return <SelectConcepts gameInfo={gameInfo} userId={userId} />;
    if (gameInfo.step === "init")
      return <SelectWord gameInfo={gameInfo} userId={userId} />;
    if (gameInfo.step === "select")
      return <SelectConcepts gameInfo={gameInfo} userId={userId} />;
  };

  return <div>{selectAdminControls()}</div>;
}
