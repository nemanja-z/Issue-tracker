export default `
  type Group{
      id:ID!
      name:String!
      owner:User
      members:[User]
  }
  type Query{
    allGroups: [Group]
  }
  type Mutation{
      createGroup(name:String!):Boolean!
  }
`;