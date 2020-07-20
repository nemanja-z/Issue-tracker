module.exports = `
  type Group{
      owner:User
      members:[User]
  }
  type Mutation{
      createGroup(name:String!):Boolean!
  }
`;