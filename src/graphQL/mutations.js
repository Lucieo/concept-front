import gql from 'graphql-tag';


export const SIGNUP_USER = gql`
mutation SignUp($email: String!, $password: String!, $name: String!){
    signup(email: $email, password: $password, name: $name){
        email
        name
    }
}
`;

export const MODIFY_USER = gql`
mutation ModifyUser($icon: String!, $name: String!){
    modifyUser(name: $name, icon: $icon){
        icon,
        name
    }
}
`;

export const JOIN_GAME = gql`
mutation JoinGame($gameId: ID!){
    joinGame(gameId: $gameId){
        id
    }
  }
`;

export const LEAVE_GAME = gql`
mutation LeaveGame($gameId: ID!){
    leaveGame(gameId: $gameId){
        id
    }
  }
`;

export const SELECT_CARD = gql`
mutation SelectCard($gameId:ID!, $cardId:ID!, $actionType:String!){
    selectCard(gameId:$gameId, cardId:$cardId, actionType:$actionType){
        status
    }
}
`;

export const CHANGE_GAME_STATUS = gql`
mutation ChangeGameStatus($newStatus:String!, $gameId: ID!){
    changeGameStatus(gameId:$gameId, newStatus:$newStatus){
      status
      id
    }
  }
`;

export const INIT_GAME = gql`
mutation InitGame($gameId:ID!, $currentWord:String!, $cardId:ID!){
    initGame(gameId:$gameId, currentWord: $currentWord, cardId: $cardId){
        status
    }
}`

export const LAUNCH_GAME_STEP = gql `
mutation LaunchGameStep($gameId:ID!, $step: String!, $turnMaster: ID!){
    launchGameStep(gameId: $gameId, step:$step, turnMaster:$turnMaster){
        id
    }
}
`




