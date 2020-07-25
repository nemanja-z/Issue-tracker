export default `
  type User{
      id:ID!
      username:String!
      email:String!
      groups:[Group]
  }
  type Token{
    value:String!
  }
  type Query{
    _dummy: String
  }
  type Mutation{
      createUser(username:String!, email:String!, password:String!):User
      loginUser(username:String!, password:String!):Token!
  }
  `;