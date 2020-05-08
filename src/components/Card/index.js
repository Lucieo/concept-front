import React from "react";
import "./Card.css";
import CardOwner from "./CardOwner";
import CardVotes from "./CardVotes";

export default function Card({
  card,
  selected = false,
  clickAction = null,
  isOwnCard = false,
  actionType = null,
  owner = null,
  votes = null,
  fullSize = false,
  isTurnMasterCard = false,
}) {
  return (
    <div className={`col ${fullSize ? "m12" : "m4"} s12 playerCard__wrapper`}>
      <div
        className={`playerCard ${
          actionType === "submitCard" && selected && "selected"
        } ${actionType === "voteForCard" && selected && "voted"} ${
          isOwnCard && "ownCard"
        } ${!isOwnCard && "canHover"} ${isTurnMasterCard && "selected"}`}
        style={{
          background:
            process.env.NODE_ENV === "development"
              ? `url(http://localhost:4000/images/${card.fileName})`
              : `url(https://dixit-live.herokuapp.com/images/${card.fileName})`,
        }}
        onClick={() => clickAction && clickAction()}
      >
        {actionType === "submitCard" && selected && (
          <i className="material-icons medium yellow-text text-darken-2">
            star
          </i>
        )}
        {actionType === "voteForCard" && selected && (
          <i className="material-icons medium green-text text-darken-2">
            thumb_up
          </i>
        )}
      </div>
      {owner && (
        <CardOwner
          owner={owner}
          isOwnCard={isOwnCard}
          isTurnMasterCard={isTurnMasterCard}
        />
      )}
      {votes && <CardVotes votes={votes} />}
    </div>
  );
}
