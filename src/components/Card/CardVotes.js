import React from "react";
import { PlayerCardIcon } from "components/PlayerIcons";

export default function CardVotes({ votes }) {
  return (
    <div className="center">
      <p>les votes reçus</p>
      {votes.length ? (
        votes.map((vote, idx) => (
          <span key={idx}>
            <PlayerCardIcon player={vote} size={"small"} />
            <span>{vote.name}</span>
          </span>
        ))
      ) : (
        <i>pas de vote pour cette carte</i>
      )}
    </div>
  );
}
