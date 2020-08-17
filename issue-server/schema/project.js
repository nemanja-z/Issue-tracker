export default `
  type Project{
      id:ID!
      name:String!
      url:String
  }
  type Query{
    allProjects:[Project]
  }
  type Mutation{
      createProject(name:String!, url:String):Boolean!
      addRole(username:String!, project:String!, role:String!):Boolean!
  }
`;