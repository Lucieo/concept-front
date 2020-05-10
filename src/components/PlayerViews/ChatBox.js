import React, { useState } from "react";
import { GUESS_UPDATE } from "graphQL/subscriptions";
import { GUESS_ACTION } from "graphQL/mutations";
import { useSubscription, useMutation } from "@apollo/react-hooks";
import HasWon from "components/HasWon";
import PlayerAnswer from "components/PlayerAnswer";
import { ReactComponent as Mind } from "images/mind.svg";

export default function ChatBox({ gameInfo }) {
  const gameId = gameInfo.id;
  const { players, turn } = gameInfo;
  const [proposition, setProposition] = useState("");
  const [feedBack, setFeedBack] = useState([]);
  const [winner, setWinner] = useState();

  const guessSubscription = useSubscription(GUESS_UPDATE, {
    variables: { gameId },
    onSubscriptionData: ({ client, subscriptionData }) => {
      const data = subscriptionData.data.guessUpdate;
      console.log("GUESS GAME RECEIVED", data);
      setFeedBack([...feedBack, data]);
      if (data.winner) {
        setWinner(data);
      }
    },
    onError(...error) {
      console.log(error);
    },
  });

  const [guess, { loading }] = useMutation(GUESS_ACTION, {
    variables: {
      gameId,
      word: proposition,
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (proposition) {
      setProposition(proposition);
      guess();
      setProposition("");
    }
  };

  return (
    <>
      <div className="playerView__chatBox card">
        <div className="chatBox__feedback">
          {feedBack.length > 0 ? (
            feedBack.map((proposition, idx) => (
              <PlayerAnswer {...proposition} key={idx} />
            ))
          ) : (
            <div className="chatBox__noFeedback">
              <Mind style={{ height: 150, width: 150 }} />
              <p className="center">
                Il est temps d'agiter ses petits neuronnes!
              </p>
            </div>
          )}
        </div>
        <div className="chatBox__input">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="votre proposition"
              value={proposition}
              onChange={(e) => setProposition(e.target.value)}
            />
          </form>
        </div>
      </div>
      {winner && <HasWon {...winner} turnMaster={players[turn]} />}
    </>
  );
}
