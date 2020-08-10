export default `
  type Query{
    id:ID!
    issue_type:String!
    description: String,
    priority: String
    resolution: String
    project:Project
    reporter:User
  }
  input Issue{
    issue_type:String!
    description: String,
    priority: String
    resolution: String
    project:String
    reporter:String
  }
  type Query{
    _dummy: String
  }
  type Mutation{
    createIssue(input:Issue!):Boolean!
  }
`;