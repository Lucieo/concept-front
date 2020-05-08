import gql from "graphql-tag";

export const CURRENT_USER = gql`
  {
    currentUser {
      id
      name
      email
      icon
      totalPoints
      totalGames
    }
  }
`;

export const GET_USER_ID = gql`
  {
    userId @client
  }
`;

export const GET_GAME_INFO = gql`
  query GetGameInfo($gameId: ID!) {
    getGameInfo(gameId: $gameId) {
      id
      status
      step
      turn
      players {
        id
        name
        icon
      }
      creator
      currentWord
      turnPoints {
        player
        points
      }
      gamePoints {
        player
        points
      }
      turnDeck {
        owner
        card {
          id
          fileName
        }
      }
      turnVotes {
        owner
        card {
          id
          fileName
        }
      }
    }
  }
`;

export const GET_DECK = gql`
  query GetDeck($gameId: ID!) {
    getDeck(gameId: $gameId) {
      cards {
        id
        fileName
      }
    }
  }
`;
