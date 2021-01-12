"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = exports.typeDefs = void 0;

var _models = require("./models");

const {
  ApolloServer
} = require('apollo-server');

const jwt = require('jsonwebtoken');

const path = require('path');

const {
  mergeTypeDefs
} = require('@graphql-tools/merge');

const {
  mergeResolvers
} = require('@graphql-tools/merge');

const {
  loadFilesSync
} = require('@graphql-tools/load-files');

require('dotenv').config();

const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './schema')));
exports.typeDefs = typeDefs;
const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, './resolvers')));
exports.resolvers = resolvers;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({
    req
  }) => {
    const auth = req ? req.headers.authorization : null;
    let user;

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET);
      user = await _models.db.User.findByPk(decodedToken.id);
    }

    return {
      models: _models.db,
      user,
      cloudinary: _models.cloudinary
    };
  }
});
server.listen({
  port: process.env.PORT || 4000
}).then(({
  url
}) => {
  console.log(`🚀  Server ready at ${url}`);
});