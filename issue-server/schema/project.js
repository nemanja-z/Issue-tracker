export default `
  type Project{
      id:Int!
      name:String!
      creator:User
  }
  type Query{
    _dummy: String
  }
  type Mutation{
      createProject(name:String!):Boolean!
  }
`;