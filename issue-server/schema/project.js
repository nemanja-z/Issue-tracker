export default `
  type Project{
      id:Int!
      name:String!
      url:String
      creator:User
  }
  type Query{
    _dummy: String
  }
  type Mutation{
      createProject(name:String!):Boolean!
  }
`;