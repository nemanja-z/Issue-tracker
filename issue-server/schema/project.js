export default `
  type Project{
      id:Int!
      name:String!
      group:[Group]
  }
  type Query{
    _dummy: String
  }
  type Mutation{
      createProject(name:String!):Boolean!
  }
`;