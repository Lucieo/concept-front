import gql from "graphql-tag";

export const GAME_UPDATE = gql`
  subscription GameUpdate($gameId: ID!) {
    gameUpdate(gameId: $gameId) {
      step
      status
      creator
      turn
      players {
        id
        name
        icon
      }
      currentWord
      gamePoints {
        player
        points
      }
    }
  }
`;

export const PLAYER_UPDATE_SUBSCRIPTION = gql`
  subscription PlayerUpdate($gameId: ID!) {
    playerUpdate(gameId: $gameId) {
      players {
        id
        name
        icon
      }
      creator
    }
  }
`;

export const GUESS_UPDATE = gql`
  subscription GuessUpdate($gameId: ID!) {
    guessUpdate(gameId: $gameId) {
      word
      player {
        name
        icon
      }
      winner
    }
  }
`;

export const CONCEPTS_UPDATE = gql`
  subscription ConceptsUpdate($gameId: ID!) {
    conceptsUpdate(gameId: $gameId) {
      concepts
    }
  }
`;
