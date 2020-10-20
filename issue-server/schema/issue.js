export default `
  scalar Date
  type Comment{
    comment:String
    commenter:User
  }
  type Issue{
    id:ID!
    issue_type:String!
    description: String,
    priority: String
    resolution: String
    status:String
    Project:Project
    summary:String!
    reporter:User!
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
  type AddIssuePayload{
    issue:Issue!
    refetch: Query!
  }
  type Query{
    issuesAll:[Issue]
    assignedToMe: [Issue]
    allIssues(projectId:String): [Issue]
    targetIssue(issueId:String): Issue
    issueComment(issueId:String): [Comment]
  }
  type Mutation{
    createIssue(input:Fields):AddIssuePayload!
    assignUser(user:String!, issue:String!, project:String!):Boolean!
    postComment(comment:String!, issueId:String!):Boolean!
  }
`;