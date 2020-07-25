export default `
  type Group{
      id:Int!
      owner:User
      members:[User]
  }
  type Query{
    _dummy: String
  }
  type Mutation{
      createGroup(name:String!):Boolean!
  }
`;