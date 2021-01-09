"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = `
  scalar Date
  type Project{
      id:ID!
      name:String!
      url:String
      isActive:Boolean
      manager:User
      member:[User]
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
      addMember(username:String!, project:String!):AddProjectPayload!
      changeStatus(isActive:Boolean!, projectId:String!):AddProjectPayload!
  }
`;
exports.default = _default;