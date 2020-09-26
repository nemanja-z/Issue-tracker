export default `
  type User{
      id:ID!
      username:String!
      email:String!
  }
  type Query{
    allUsers(me:Boolean): [User]
    currentUser: User
  }
  type Mutation{
      createUser(username:String!, email:String!, password:String!):User
      loginUser(username:String!, password:String!):String!
  }
  `;