import React, { useState } from "react";
import Card from "components/Card";
import { SELECT_CARD } from "graphQL/mutations";
import { useMutation } from "@apollo/react-hooks";
import MysteryCard from "components/MysteryCard";

export default function ChoiceDeck({
  gameId,
  cards,
  chosenCard,
  setChosenCard,
  setSubmitted,
  actionType,
  ownCard,
  currentWord,
  turnMaster,
  admin = false,
}) {
  const [submitCard, { loading }] = useMutation(SELECT_CARD, {
    variables: {
      gameId,
      cardId: chosenCard && chosenCard.id,
      actionType,
    },
    onCompleted() {
      setSubmitted(true);
    },
  });

  return (
    <div>
      <div className="center">
        {actionType == "submitCard" ? (
          <h4>Il est temps de choisir une carte</h4>
        ) : (
          <h4>Passons au vote!</h4>
        )}
      </div>
      {!admin && (
        <div className="center">
          <div className="row">
            <div className="col m6 s12">
              <h5>Carte choisie</h5>
              {chosenCard ? (
                <Card card={chosenCard} fullSize={true} />
              ) : (
                <MysteryCard />
              )}
            </div>
            <div className="col m6 s12">
              <h5>{turnMaster && turnMaster.name} a choisi le mot</h5>
              <h4>{currentWord}</h4>
              <div>
                <button
                  className={`btn ${(loading || !chosenCard) && "disabled"}`}
                  onClick={() => submitCard()}
                >
                  {loading && <i className="material-icons">access_time</i>}
                  {actionType == "submitCard" ? (
                    <span>Valider ma carte</span>
                  ) : (
                    <span>Voter pour cette carte</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {actionType === "submitCard" ? (
        <h4 className="center">vos cartes</h4>
      ) : (
        <h4 className="center">les cartes du plateau</h4>
      )}
      <hr />
      <div className="row playerDeck">
        {cards &&
          cards.map((card, index) => (
            <Card
              card={card}
              key={index}
              selected={chosenCard && chosenCard.id === card.id}
              clickAction={() => {
                if ((ownCard && card !== ownCard) || !ownCard) {
                  setChosenCard(card);
                }
              }}
              actionType={actionType}
              isOwnCard={ownCard && card === ownCard}
            />
          ))}
      </div>
    </div>
  );
}
