export default `
  scalar Date
  type Issue{
    id:ID!
    issue_type:String!
    description: String,
    priority: String
    resolution: String
    status:String
    reporter:ID!
    createdAt:Date
    updatedAt:Date
  }
  input Fields{
    issue_type:String!
    description: String,
    priority: String
    resolution: String
    project:String!
  }
  type Query{
    allIssues(projectId:String!): [Issue]
  }
  type Mutation{
    createIssue(input:Fields):Boolean!
    assignUser(user:String!, issue:String!, project:String!):Boolean!
  }
`;