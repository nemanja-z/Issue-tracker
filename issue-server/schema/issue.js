export default `
  type Issue{
    id:ID!
    issue_type:String!
    description: String,
    priority: String
    resolution: String
    Project:Project
    reporter:User
  }
  input Fields{
    issue_type:String!
    description: String,
    priority: String
    resolution: String
    project:String!
  }
  type Query{
    allIssues: [Issue]
  }
  type Mutation{
    createIssue(input:Fields):Boolean!
  }
`;