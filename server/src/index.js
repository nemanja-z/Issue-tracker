const { GraphQLServer } = require('graphql-yoga');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const { mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');
const path = require('path');
//import { loadFilesSync } from '@graphql-tools/load-files';
const models = require('./models');
//import models from './models';

const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, './resolvers')));

const server = new GraphQLServer({
    typeDefs,
    resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
models.sequelize.sync({}).then(() => {

});
