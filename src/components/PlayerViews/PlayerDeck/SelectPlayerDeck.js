import React, { useState } from "react";
import Loading from "components/Loading";
import ChoiceDeck from "./ChoiceDeck";
import ValidatedDeck from "./ValidatedDeck";
import { GET_DECK } from "graphQL/queries";
import { useQuery } from "@apollo/react-hooks";

export default function SelectPlayerDeck({ gameInfo, userId, turnDeck }) {
  const { currentWord, players, turn } = gameInfo;
  const gameId = gameInfo.id;
  const submittedCard = gameInfo.turnDeck.find((el) => el.owner === userId);
  const [userCards, setUserCards] = useState([]);

  const { loading } = useQuery(GET_DECK, {
    variables: { gameId: gameInfo.id },
    onCompleted({ getDeck }) {
      setUserCards(getDeck.cards);
      console.log(
        "GETTING USER DECK-------------------------------------",
        getDeck.cards
      );
    },
    fetchPolicy: "network-only",
    onError(...error) {
      console.log(error);
    },
  });

  const [chosenCard, setChosenCard] = useState(
    submittedCard && submittedCard.card
  );
  const [submitted, setSubmitted] = useState();

  if (loading) return <Loading />;
  return (
    <div className="center container">
      {submittedCard || submitted ? (
        <ValidatedDeck
          currentword={currentWord}
          chosenCard={chosenCard}
          actionType={"submitCard"}
          players={gameInfo.players}
          turn={gameInfo.turn}
          turnDeck={turnDeck}
          userCards={userCards.filter((card) => card.id !== chosenCard.id)}
        />
      ) : (
        <ChoiceDeck
          gameId={gameId}
          cards={userCards}
          setChosenCard={setChosenCard}
          chosenCard={chosenCard}
          setSubmitted={setSubmitted}
          actionType={"submitCard"}
          currentWord={currentWord}
          userId={userId}
          turnMaster={players[turn]}
        />
      )}
    </div>
  );
}
