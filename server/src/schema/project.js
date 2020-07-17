module.exports`
  type Project{
      id:Int!
      name:String!
      public:Boolean!
      issues:[Issue]
      group:[Group]
  }
  type Mutation{
      createProject(userId:Int!, name:String!, public:Boolean=false):Boolean
  }
`;