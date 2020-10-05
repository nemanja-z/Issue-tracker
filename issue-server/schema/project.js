export default `
  scalar Date
  type Project{
      id:ID!
      name:String!
      url:String
      Users:[User]
      createdAt:Date
      updatedAt:Date
  }
  type ProjectManager{
    leaderId:ID!
    project_lead:String
    project:String
    url:String
    projectId:String
    createdAt:Date
    updatedAt:Date
  }
  type Query{
    allProjects:[Project]
    userProjects:[ProjectManager]
    allProjectManagers:[ProjectManager]
    findProject(projectId: String!):Project
  }
  type Mutation{
      createProject(name:String!, url:String, role:String):Boolean!
      addRole(username:String!, project:String!, role:String!):Boolean!
  }
`;