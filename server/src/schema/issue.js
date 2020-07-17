module.exports`
  type Issue{
    id:Int!
    issue_type:String!
    summary: String!
    description: String,
    priority: String
    resolution: String,
    attachment: String
  }
  type Mutation{
    createIssue(groupId:Int!,
    userId:Int!,
    issue_type:String!
    summary: String!
    description: String,
    priority: String
    resolution: String,
    attachment: String):Boolean
  }
`;