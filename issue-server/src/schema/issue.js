export default `
  scalar Date
  type Comment{
    comment:String
    commenter:User
  }
  type Issue{
    id:ID!
    issueNumber:Int!
    issue_type:String!
    description: String,
    priority: String
    resolution: String
    status:String
    Project:Project
    summary:String!
    reporter:User!
    assignees:[User]
    createdAt:Date
    updatedAt:Date
    Users:[User]
    attachment:[String]
  }
  input Fields{
    summary:String!
    status:String!
    issue_type:String!
    description: String
    priority: String
    resolution: String
    project:String!
    attachment:Upload
  }
  input Edit{
    summary:String
    status:String
    issue_type:String
    description: String
    priority: String
    resolution: String
  }
  type AddIssuePayload{
    issue:Issue!
    refetch: Query!
  }
  type AddCommentPayload{
    comment:Comment!
    refetch: Query!
  }
  type Query{
    issuesAll:[Issue]
    allComments:[Comment]
    assignedToMe: [Issue]
    allIssues(projectId:String): [Issue]
    targetIssue(issueId:String): Issue
    issueComment(issueId:String): [Comment]
  }
  type Mutation{
    createIssue(input:Fields):AddIssuePayload!
    editIssue(issueId: String, input:Edit): AddIssuePayload!
    assignUser(user:String!, issue:String!, project:String!):AddIssuePayload!
    postComment(comment:String!, issueId:String!):AddCommentPayload!
  }
`;