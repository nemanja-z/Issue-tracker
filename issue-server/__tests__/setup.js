const { ApolloServer, gql } = require('apollo-server');
import { createTestClient } from 'apollo-server-testing';
import dotenv from 'dotenv';
import path from 'path';
import { db as models } from '../models';
const { mergeTypeDefs } = require('@graphql-tools/merge');
const { mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');
const bcrypt = require('bcrypt');

dotenv.config();

export const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, '../schema')));
export const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, '../resolvers')));


  let user;
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
      return {models,
      user}}
  });
  const {query, mutate} = createTestClient(server);
  

beforeAll(async()=>{
  await Promise.all(
    Object.keys(models).map(key => {
      if (['sequelize', 'Sequelize'].includes(key)) return null;      
      return models[key].destroy({ where: {}, force: true });
    })
  );
  user = await models.User.create({
    username: "Ljubivoje",
    email: "lginmwyffgkkpvgplk@niwghx.com",
    role: "Manager",
    profile:process.env.CLOUDINARY,
    passwordHash: await bcrypt.hash('Popajce', 10),
    isVerified:true
  })
  console.log({user})}
)
  describe('User', () => {
    /* const SIGN_UP = gql`
    mutation createUser($username:String!, $password:String!, $email:String!, $role:String!, $profile:Upload){
        createUser(username:$username, password:$password, email:$email, role:$role, profile:$profile){
            username
            email
            role
        }
    }`; */
  
      test('Login', async () => {
        const LOGIN = gql`
              mutation loginUser($username:String!, $password:String!){
              loginUser(username:$username, password:$password)
              }`;
        const loginUser = await mutate({
          mutation: LOGIN,
          variables: {
              username: 'Ljubivoje',
              password:'Popajce'
            
          }
        });
        expect(loginUser).toMatchSnapshot();
        // const { user } = result.data.deleteUser ?? {};
      });
  
    })

afterAll(async()=>{
      
    
      await models.sequelize.close();
  }
    )