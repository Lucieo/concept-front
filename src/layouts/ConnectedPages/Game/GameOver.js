import React from "react";
import "./Game.css";
import endGif from "images/dab.gif";
import PlayerCardIcon from "components/PlayerIcons/PlayerCardIcon";
import PlayerListIcon from "components/PlayerIcons/PlayerListIcon";

const GameOver = ({ gameInfo }) => {
  const { gamePoints, players } = gameInfo;
  // const podium = gamePoints
  //   .map((point) => {
  //     const playerInfo = players.find((player) => point.player === player.id);
  //     return { points: point.points, player: playerInfo };
  //   })
  //   .sort((a, b) => b.points - a.points);
  // const winnerPoints = podium[0].points;
  // const winners = podium.filter((player) => player.points >= winnerPoints);
  // const winnersIds = winners.map((el) => el.player.id);

  return (
    <div className="center">
      <h3>GAME OVER BITCHES</h3>
      <img className="game-over__gif" src={endGif} alt="artist" />
      {/* <div>
        {winners.length === 1 ? (
          <SingleWinner winner={winners[0]} />
        ) : (
          <Exaequo winners={winners} />
        )}

        <h5>le reste du podium</h5>
        <ul>
          {podium
            .filter((player) => winnersIds.indexOf(player.player.id) < 0)
            .map((player, idx) => (
              <PlayerListIcon
                player={player.player}
                points={player.points}
                key={idx}
              />
            ))}
        </ul>
      </div> */}
    </div>
  );
};

export default GameOver;

const Exaequo = ({ winners }) => {
  return (
    <div>
      <h5>And the winners are</h5>
      {winners.map((winner, idx) => (
        <div key={idx}>
          <h4>{winner.player.name}</h4>
          <PlayerCardIcon player={winner.player} size="big" />
        </div>
      ))}
      <h6>avec {winners[0].points} points exaequo</h6>
    </div>
  );
};

const SingleWinner = ({ winner }) => {
  return (
    <div>
      <h5>And the winner is {winner.player.name}!</h5>
      <PlayerCardIcon player={winner.player} size="big" />
      <h6>avec {winner.points} points</h6>
    </div>
  );
};
