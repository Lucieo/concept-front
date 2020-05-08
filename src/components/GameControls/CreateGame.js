import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import gql from "graphql-tag";

const CREATE_GAME = gql`
  mutation {
    createGame {
      id
    }
  }
`;

export default function CreateGame() {
  const history = useHistory();
  const [createGame] = useMutation(CREATE_GAME, {
    onCompleted({ createGame }) {
      history.push(`/game/${createGame.id}`);
    },
  });

  return (
    <>
      <button onClick={() => createGame()} className="btn">
        NOUVELLE PARTIE
      </button>
    </>
  );
}
