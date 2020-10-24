export default `
  scalar Date
  type Project{
      id:ID!
      name:String!
      url:String
      isActive:Boolean
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
  type AddProjectPayload{
    project:Project!
    refetch: Query!
  }
  type Query{
    allProjects:[Project]
    userProjects:[Project]
    allProjectManagers:[ProjectManager]
    findProject(projectId: String!):Project
  }
  type Mutation{
      createProject(name:String!, url:String, projectLead:String):AddProjectPayload!
      addRole(username:String!, project:String!, role:String!):Boolean!
  }
`;