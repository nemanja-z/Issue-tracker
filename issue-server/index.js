const { ApolloServer } = require('apollo-server');
import models from './models';
const { mergeTypeDefs } = require('@graphql-tools/merge');
const { mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';


const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, './resolvers')));
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        let user;
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET);
            user = await models.User.findByPk(decodedToken.id);
        }
        return {
        models,
        user};
}});
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});