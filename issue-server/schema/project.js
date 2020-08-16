export default `
  type Project{
      id:ID!
      name:String!
      url:String
      Users:[User]
  }
  type Query{
    allProjects:[Project]
  }
  type Mutation{
      createProject(name:String!,url:String):Boolean!
      addMember(username:String!,project:String!):Boolean!
  }
`;