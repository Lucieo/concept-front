import React from "react";
import { PlayerCardIcon } from "components/PlayerIcons";

export default function CardOwner({
  owner,
  isOwnCard,
  isTurnMasterCard = false,
}) {
  return (
    <div className="center">
      <p
        style={{
          height: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isOwnCard ? "Votre carte" : `la carte de ${owner.name}`}
        {isTurnMasterCard && <i className="material-icons amber-text">star</i>}
      </p>
      <PlayerCardIcon player={owner} />
    </div>
  );
}
