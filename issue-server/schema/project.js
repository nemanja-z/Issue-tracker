export default `
  type Project{
      id:Int!
      name:String!
      url:String
      project_lead:User
      Users:[User]
  }
  type Query{
    allProjects:[Project]
  }
  type Mutation{
      createProject(name:String!,url:String):Boolean!
      addMember(username:String!,project:String!):Boolean!
  }
`;