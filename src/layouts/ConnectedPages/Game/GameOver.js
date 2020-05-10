import React from "react";
import "./Game.css";
import endGif from "images/dab.gif";
import PlayerCardIcon from "components/PlayerIcons/PlayerCardIcon";
import PlayerListIcon from "components/PlayerIcons/PlayerListIcon";

const GameOver = ({ gameInfo }) => {
  const { gamePoints } = gameInfo;
  gamePoints.sort((a, b) => b.points - a.points);
  const winners = gamePoints.filter((el) => el.points >= gamePoints[0].points);
  const podium = gamePoints.filter((el) => winners.indexOf(el) < 0);

  return (
    <div className="center">
      <h3>VICTOIRE PAR KO</h3>
      <img className="game-over__gif" src={endGif} alt="artist" />
      <div>
        {winners.length === 1 ? (
          <SingleWinner winner={winners[0]} />
        ) : (
          <Exaequo winners={winners} />
        )}

        <h5>le reste du podium</h5>
        <ul>
          {podium.map((player, idx) => (
            <PlayerListIcon
              player={player.player}
              points={player.points}
              key={idx}
            />
          ))}
        </ul>
      </div>
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
