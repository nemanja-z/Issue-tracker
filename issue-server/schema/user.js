export default `
  type User{
      id:ID!
      username:String!
      email:String!
      role:String!
      profile:String
  }
  type Query{
    allUsers(me:Boolean): [User]
    allUnassignedUsers: [User]
    projectUsers(name:String):[User]
    me: User
  }
  type Mutation{
    createUser(username:String!, email:String!, password:String!, role:String!, profile:Upload):User
    loginUser(username:String!, password:String!):String!
    forgetPassword(email:String!, newPassword:String!):Boolean!
  }
  `;