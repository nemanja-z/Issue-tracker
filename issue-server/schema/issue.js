export default `
input Issue{
    id:Int!
    issue_type:String!
    summary: String!
    description: String,
    priority: String
    resolution: String
  }
  type Query{
    _dummy: String
  }
  type Mutation{
    createIssue(input:Issue!,projectId:Int!):Boolean!
  }
`;