export default `
  scalar Date
  type Project{
      id:ID!
      name:String!
      url:String
      projectLead:User
      createdAt:Date
      updatedAt:Date
  }
  type ProjectManager{
    leaderId:ID
    project_lead:String
    project:String
    url:String
    projectId:String
  }
  type Query{
    allProjects:[Project]
    userProjects:[Project]
    allProjectManagers:[ProjectManager]
    findProject(projectId: String!):Project
  }
  type Mutation{
      createProject(name:String!, url:String):Boolean!
      addRole(username:String!, project:String!, role:String!):Boolean!
  }
`;