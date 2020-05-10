import React, { useState } from "react";
import "./PlayerView.css";
import { useSubscription } from "@apollo/react-hooks";
import { CONCEPTS_UPDATE } from "graphQL/subscriptions";
import conceptsList from "data/concepts";
import ReactTooltip from "react-tooltip";

export default function ConceptDisplay({ gameInfo }) {
  const gameId = gameInfo.id;
  const [concepts, setConcepts] = useState(gameInfo.conceptsLists);
  const guessSubscription = useSubscription(CONCEPTS_UPDATE, {
    variables: { gameId },
    onSubscriptionData: ({ client, subscriptionData }) => {
      const data = subscriptionData.data.conceptsUpdate;
      console.log("CONCEPTS UPDATE RECEIVED", data);
      setConcepts(data.concepts);
    },
    onError(...error) {
      console.log(error);
    },
  });
  return (
    <div className="playerView__conceptDisplay">
      {concepts.map((items, idx) => (
        <ConceptLine key={idx} idx={idx} items={items} />
      ))}
    </div>
  );
}

const ConceptLine = ({ items, idx }) => {
  const concepts = items.map((item) =>
    conceptsList.find((el) => el.img === item)
  );
  return (
    <div>
      {idx === 0 ? <h6>Concept Principal</h6> : <h6>Concept {idx + 1}</h6>}
      {concepts.map((el) => (
        <p>{el.text}</p>
      ))}
      <div className="playerView__list">
        {items.length > 0 ? (
          concepts.map((concept, idx) => (
            <ConceptItem concept={concept} key={idx} />
          ))
        ) : (
          <p>Aucun sous-concept sélectionné dans cette catégorie</p>
        )}
      </div>
      <hr />
    </div>
  );
};

const ConceptItem = ({ concept }) => {
  return (
    <a data-for={concept.id} data-tip={concept.text} data-iscapture="true">
      <div className="card playerView__concept">
        <img
          src={`/images/concepts/${concept.img}`}
          style={{ width: 80, height: 80 }}
        />
        <ReactTooltip id={concept.id} place="top" type="dark" effect="solid" />
      </div>
    </a>
  );
};
