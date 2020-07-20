module.exports = `
  type User{
      id:Int!
      username:String!
      email:String!
      groups:[Group]
  }
  type Mutation{
      createUser(username:String!, email:String!, password:String!):User
      loginUser(username:String!,password:String!):String!
  }
  `;