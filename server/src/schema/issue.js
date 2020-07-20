module.exports = `

scalar Upload
input Issue{
    id:Int!
    issue_type:String!
    summary: String!
    description: String,
    priority: String
    resolution: String,
    attachment: Upload
  }
  type Mutation{
    createIssue(input:Issue!):Boolean!
  }
`;