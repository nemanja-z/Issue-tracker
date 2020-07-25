const { ApolloServer } = require('apollo-server');
import models from './models';
const { mergeTypeDefs } = require('@graphql-tools/merge');
const { mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');
import path from 'path';
import dotenv from 'dotenv'
dotenv.config()

const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, './resolvers')));
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        models
    }
});

models.sequelize.sync().then(() => {
    server
        .listen()
        .then(({ url }) => console.log('Server is running on localhost:4000'))
})