import React, { useState } from "react";
import "./PlayerView.css";
import { useSubscription } from "@apollo/react-hooks";
import { CONCEPTS_UPDATE } from "graphQL/subscriptions";

export default function ConceptDisplay({ gameInfo }) {
  const gameId = gameInfo.id;
  const [concepts, setConcepts] = useState(gameInfo.conceptsLists);
  const guessSubscription = useSubscription(CONCEPTS_UPDATE, {
    variables: { gameId },
    onSubscriptionData: ({ client, subscriptionData }) => {
      const data = subscriptionData.data.conceptsUpdate;
      console.log("CONCEPTS UPDATE RECEIVED", data);
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
  return (
    <div>
      {idx === 0 ? <h6>Concept Principal</h6> : <h6>Concept {idx + 1}</h6>}
      {items.length > 0 ? (
        items.map((img) => <ConceptItem img={img} />)
      ) : (
        <p>Aucun sous-concept sélectionné dans cette catégorie</p>
      )}
      <hr />
    </div>
  );
};

const ConceptItem = ({ img }) => {
  return (
    <div>
      <img src={`/images/concepts/${img}`} style={{ width: 80, height: 80 }} />
    </div>
  );
};
