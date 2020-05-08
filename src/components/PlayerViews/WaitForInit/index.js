import React, { useState } from "react";
import "./Wait.css";
import { GET_DECK } from "graphQL/queries";
import { useQuery } from "@apollo/react-hooks";
import Loading from "components/Loading";
import Card from "components/Card";

export default function WaitForInit({ gameInfo }) {
  const { players, turn } = gameInfo;
  const turnAdmin = players[turn];
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

  if (loading) return <Loading />;

  return (
    <>
      <div className="waiting__wrapper container center">
        <img
          className="swing"
          src={`../images/players/${turnAdmin.icon}.png`}
          alt="admin icon"
        />
        <p>
          Un peu de patience {turnAdmin.name} est entrain de sélectionner une
          carte et un mot pour commencer un nouveau tour...
        </p>
      </div>
      <hr />
      <div className="center">
        <h5>Profitez-en pour regarder vos cartes</h5>
        <div className="row">
          {userCards.map((card, idx) => (
            <Card key={idx} card={card} />
          ))}
        </div>
      </div>
    </>
  );
}
