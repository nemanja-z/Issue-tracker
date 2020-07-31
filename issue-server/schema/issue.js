export default `
  type Query{
    id:ID!
    issue_type:String!
    summary: String!
    description: String,
    priority: String
    resolution: String
    projectId:Project
  }
  input Issue{
    issue_type:String!
    summary: String!
    description: String,
    priority: String
    resolution: String
    projectId:ID!
  }
  type Query{
    _dummy: String
  }
  type Mutation{
    createIssue(input:Issue!):Boolean!
  }
`;