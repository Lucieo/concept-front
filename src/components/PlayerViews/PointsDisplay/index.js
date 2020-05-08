import React from "react";
import Card from "components/Card";

export default function PointsDisplay({ gameInfo, userId }) {
  const { turnDeck, turnVotes, players, turn } = gameInfo;
  let { turnPoints } = gameInfo;
  const turnMasterId = players[turn].id;
  const turnMasterPointsIndex = turnPoints.findIndex(
    (el) => el.player === turnMasterId
  );
  const turnMasterCard = turnDeck.find((card) => card.owner === turnMasterId)
    .card;

  const playerPoints = turnPoints.find((point) => point.player === userId);

  const getPointMessage = (playerPoints) => {
    return playerPoints.points > 0 ? (
      <h4>Bravo vous avez gagné {playerPoints.points} points</h4>
    ) : (
      <h4>Dommage {playerPoints.points} pour vous sur ce tour...</h4>
    );
  };

  return (
    <div className="center">
      <h4 className="center">Distribution de points!</h4>
      <hr />
      <h6>{players[turn].name} avait choisi le mot</h6>
      <h5>{gameInfo.currentWord}</h5>
      <hr />

      {playerPoints && getPointMessage(playerPoints)}
      <hr />
      <h5>La carte qu'il fallait trouver</h5>
      <Card
        card={turnMasterCard}
        owner={players[turn]}
        isTurnMasterCard={true}
        votes={turnVotes
          .filter((vote) => vote.card.id === turnMasterCard.id)
          .map((vote) => players.find((player) => player.id === vote.owner))}
      />
      <hr />

      <div className="row  same-height">
        {turnPoints
          .filter((card, idx) => idx !== turnMasterPointsIndex)
          .map((points, idx) => {
            const card = turnDeck.find((card) => {
              return card.owner === points.player;
            }).card;
            const owner = players.find((player) => player.id === points.player);
            const votes = turnVotes
              .filter((vote) => vote.card.id === card.id)
              .map((vote) =>
                players.find((player) => player.id === vote.owner)
              );

            return (
              <Card
                key={idx}
                card={card}
                owner={owner}
                votes={votes}
                isOwnCard={owner.id === userId}
                isTurnMasterCard={false}
              />
            );
          })}
      </div>
    </div>
  );
}
