export default `
  type Issue{
    id:ID!
    issue_type:String!
    description: String,
    priority: String
    resolution: String
    ProjectId:Project
    reporter:User
  }
  type Query{
    allIssues: [Issue]
  }
  type Mutation{
    createIssue(Project:String,issue_type:String!):Boolean!
  }
`;