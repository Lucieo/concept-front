import React, { useState } from "react";
import { INIT_GAME } from "graphQL/mutations";
import { useMutation } from "@apollo/react-hooks";
import Loading from "components/Loading";

export default function SelectWord({ gameInfo }) {
  const gameId = gameInfo.id;
  const [currentWord, setCurrentWord] = useState("");

  const [initGame, initGameCall] = useMutation(INIT_GAME, {
    variables: {
      gameId,
      currentWord,
    },
  });

  return (
    <>
      <div className="row">
        <hr />
        <h4 className="center">Commencer un nouveau tour</h4>
        <hr />
        <div>
          <h5>Mon mot</h5>
          <input
            placeholder="le mot illustrant votre carte"
            value={currentWord}
            onChange={(e) => setCurrentWord(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
