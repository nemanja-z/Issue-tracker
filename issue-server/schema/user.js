export default `
  type User{
      id:ID!
      username:String!
      email:String!
      role:String
      profile:String
  }
  type Token{
     token:String
  }
  type Query{
    allUsers(me:Boolean): [User]
    allUnassignedUsers: [User]
    projectUsers(name:String):[User]
    me: User
  }
  type Mutation{
    createUser(username:String!, email:String!, password:String!, role:String!, profile:Upload):User
    loginUser(username:String!, password:String!):Token!
    forgotPassword(token:String!, newPassword:String!):Boolean!
    editUser(email:String, password:String, role:String, profile:Upload):User
    sendForgotPasswordEmail(email:String!):String
    confirmUser(token:String!):Boolean
  }
  `;