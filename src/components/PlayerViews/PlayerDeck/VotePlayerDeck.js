import React, { useState } from "react";
import Loading from "components/Loading";
import { shuffle } from "utils";
import ChoiceDeck from "./ChoiceDeck";
import ValidatedDeck from "./ValidatedDeck";
import { GET_DECK } from "graphQL/queries";
import { useQuery } from "@apollo/react-hooks";

export default function VotePlayerDeck({ gameInfo, userId, turnVotes }) {
  const gameId = gameInfo.id;
  const { turnDeck, players, turn } = gameInfo;
  const submittedCard = gameInfo.turnVotes.find((el) => el.owner === userId);
  const [userCards, setUserCards] = useState([]);
  const [gameCards, setCards] = useState(
    shuffle(turnDeck.map((el) => el.card))
  );
  const [chosenCard, setChosenCard] = useState(
    submittedCard && submittedCard.card
  );
  const [submitted, setSubmitted] = useState();
  const ownCard = turnDeck.find((card) => card.owner === userId).card;

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

  if (loading) return <Loading />;
  return (
    <>
      {submittedCard || submitted ? (
        <ValidatedDeck
          chosenCard={chosenCard}
          actionType={"voteForCard"}
          currentword={gameInfo.currentWord}
          players={gameInfo.players}
          turn={gameInfo.turn}
          turnDeck={turnDeck}
          turnVotes={turnVotes}
          userCards={userCards.filter((card) => card !== ownCard.id)}
        />
      ) : (
        <ChoiceDeck
          gameId={gameId}
          cards={gameCards}
          setChosenCard={setChosenCard}
          chosenCard={chosenCard}
          setSubmitted={setSubmitted}
          actionType={"voteForCard"}
          ownCard={ownCard}
          currentWord={gameInfo.currentWord}
          turnMaster={players[turn]}
        />
      )}
    </>
  );
}
