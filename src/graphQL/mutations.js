import gql from "graphql-tag";

export const SIGNUP_USER = gql`
  mutation SignUp($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      email
      name
    }
  }
`;

export const MODIFY_USER = gql`
  mutation ModifyUser($icon: String!, $name: String!) {
    modifyUser(name: $name, icon: $icon) {
      icon
      name
    }
  }
`;

export const JOIN_GAME = gql`
  mutation JoinGame($gameId: ID!) {
    joinGame(gameId: $gameId) {
      id
    }
  }
`;

export const LEAVE_GAME = gql`
  mutation LeaveGame($gameId: ID!) {
    leaveGame(gameId: $gameId) {
      id
    }
  }
`;

export const SELECT_CARD = gql`
  mutation SelectCard($gameId: ID!, $cardId: ID!, $actionType: String!) {
    selectCard(gameId: $gameId, cardId: $cardId, actionType: $actionType) {
      status
    }
  }
`;

export const CHANGE_GAME_STATUS = gql`
  mutation ChangeGameStatus($newStatus: String!, $gameId: ID!) {
    changeGameStatus(gameId: $gameId, newStatus: $newStatus) {
      status
      id
    }
  }
`;

export const INIT_GAME = gql`
  mutation InitGame($gameId: ID!, $currentWord: String!) {
    initGame(gameId: $gameId, currentWord: $currentWord) {
      gameId
    }
  }
`;

export const GUESS_ACTION = gql`
  mutation GuessAction($gameId: ID!, $word: String!) {
    guessAction(gameId: $gameId, word: $word) {
      gameId
    }
  }
`;

export const NEXT_TURN = gql`
  mutation NextTurn($gameId: ID!) {
    nextTurn(gameId: $gameId) {
      gameId
    }
  }
`;

export const MODIFY_CONCEPT = gql`
  mutation ModifyConcept(
    $gameId: ID!
    $conceptId: ID
    $listIndex: Int
    $action: String
  ) {
    modifyConcept(
      gameId: $gameId
      conceptId: $conceptId
      listIndex: $listIndex
      action: $action
    ) {
      gameId
    }
  }
`;

export const MODIFY_CONCEPTS_LIST = gql`
  mutation ModifyConceptsList($gameId: ID!, $listIndex: Int, $action: String) {
    modifyConceptsList(
      gameId: $gameId
      listIndex: $listIndex
      action: $action
    ) {
      gameId
    }
  }
`;
