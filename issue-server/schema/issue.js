export default `
  scalar Date
  type Issue{
    id:ID!
    issue_type:String!
    description: String,
    priority: String
    resolution: String
    status:String
    Project:Project
    summary:String!
    reporter:ID!
    createdAt:Date
    updatedAt:Date
    Users:[User]
  }
  input Fields{
    summary:String!
    status:String!
    issue_type:String!
    description: String,
    priority: String
    resolution: String
    project:String!
  }
  type Query{
    issuesAll:[Issue]
    allIssues(projectId:String): [Issue]
    targetIssue(issueId:String): Issue
  }
  type Mutation{
    createIssue(input:Fields):Boolean!
    assignUser(user:String!, issue:String!, project:String!):Boolean!
  }
`;