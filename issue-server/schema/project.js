export default `
  type Project{
      id:ID!
      name:String!
      url:String
      Users:[User]
  }
  type ProjectManager{
    leaderId:ID!
    project_lead:String
    project:String
    url:String
  }
  type Query{
    allProjects:[Project]
    allProjectManagers:[ProjectManager]
  }
  type Mutation{
      createProject(name:String!, url:String, role:String):Boolean!
      addRole(username:String!, project:String!, role:String!):Boolean!
  }
`;