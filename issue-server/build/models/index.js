"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _sequelize = require("sequelize");

var _config = _interopRequireDefault(require("../config/config"));

require('dotenv').config();

const path = require('path');

const fs = require('fs');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = _config.default[env];
const db = {};

const cloudinary = require('cloudinary').v2;

const sequelize = new _sequelize.Sequelize(process.env[config.use_env_variable], config);
fs.readdirSync(__dirname).filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js').forEach(file => {
  const model = require(path.join(__dirname, file))(sequelize, _sequelize.Sequelize);

  db[model.name] = model;
});
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
db.sequelize = sequelize;
db.Sequelize = _sequelize.Sequelize;
module.exports = {
  db,
  cloudinary
};