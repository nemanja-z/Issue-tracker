export default `
  type Project{
      id:ID!
      name:String!
      url:String
      Users:[User]
  }
  type Query{
    roles:[String]
    allProjects:[Project]
  }
  type Mutation{
      createProject(name:String!, url:String):Boolean!
      addRole(username:String!, project:String!, role:String!):Boolean!
  }
`;