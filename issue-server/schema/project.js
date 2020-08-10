export default `
  type Project{
      id:Int!
      name:String!
      url:String
      project_lead:User
  }
  type Query{
    _dummy: String
  }
  type Mutation{
      createProject(name:String!,url:String):Boolean!
  }
`;