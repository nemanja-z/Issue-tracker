export default `
  type Group{
      id:ID!
      name:String!
      creator:User
      member:User
  }
  type Query{
    allGroups: [Group]
  }
  type Mutation{
      createGroup(name:String!):Boolean!

  }
`;