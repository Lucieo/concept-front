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
      turnVotes {
        owner
        card {
          id
          fileName
        }
      }
      turnDeck {
        owner
        card {
          id
          fileName
        }
      }
      turnPoints {
        player
        points
      }
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

export const GAME_ACTION = gql`
  subscription GameAction($gameId: ID!) {
    gameAction(gameId: $gameId) {
      gameId
      actionType
      action {
        owner
        card {
          id
          fileName
        }
      }
    }
  }
`;
