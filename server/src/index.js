const { GraphQLServer } = require('graphql-yoga');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const { mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
//import { loadFilesSync } from '@graphql-tools/load-files';
const models = require('./models');
//import models from './models';

const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, './resolvers')));

const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET);
            const currentUser = await models.User.findOne({ where: { id: decodedToken.id } });
            return { currentUser };
        }
    }
});

const options = { port: 4000 }
server.start(options, () => console.log('Server is running on localhost:' + options.port))
models.sequelize.sync({});
