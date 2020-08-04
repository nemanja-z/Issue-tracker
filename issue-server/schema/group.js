export default `
  type Group{
      id:ID!
      name:String!
  }
  type Query{
    allGroups: [Group]
  }
  type Mutation{
      createGroup(name:String!):Boolean!
  }
`;