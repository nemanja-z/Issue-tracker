module.exports = `
  type Project{
      id:Int!
      name:String!
      public:Boolean!
      group:[Group]
  }
  type Mutation{
      createProject(name:String!, public:Boolean=false):Boolean!
  }
`;