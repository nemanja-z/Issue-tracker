const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');
import { cloudinary, db as models } from './models';
const path = require('path');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const { mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');
require('dotenv').config();


export const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './schema')));
export const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, './resolvers')));
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
        user,
        cloudinary};
}});
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
 

