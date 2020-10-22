export default `
  type User{
      id:ID!
      username:String!
      email:String!
      profile:String
  }
  type Query{
    allUsers(me:Boolean): [User]
    allUnassignedUsers: [User]
    me: User
  }
  type Mutation{
      createUser(username:String!, email:String!, password:String!, profile:Upload):User
      loginUser(username:String!, password:String!):String!
  }
  `;