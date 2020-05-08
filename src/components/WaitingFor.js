import React from "react";
import PlayerListIcon from "components/PlayerIcons/PlayerListIcon";

export default function WaitingFor({ players, received, turn }) {
  const responsesReceived = received.map((el) => el.owner);
  const turnMaster = players[turn];
  const latecomers = players.filter(
    (player) =>
      responsesReceived.indexOf(player.id) < 0 && player.id !== turnMaster.id
  );
  const styles = {
    listStyle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "left",
      listStyle: "none",
      width: "100%",
      marginBottom: 30,
    },
    liStyle: {
      marginLeft: 15,
    },
  };

  return (
    <div>
      {latecomers.length > 0 ? (
        <p>On attend encore :</p>
      ) : (
        <p>
          Tout le monde a envoyé sa réponse, le maître du tour doit passer à la
          prochaine étape.
        </p>
      )}
      <div style={styles.listStyle}>
        {latecomers.length > 0 &&
          latecomers.map((player, idx) => (
            <PlayerListIcon player={player} key={idx} />
          ))}
      </div>
      <hr />
    </div>
  );
}
