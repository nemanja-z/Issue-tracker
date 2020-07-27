//const { Sequelize } = require('sequelize');
require('dotenv').config();
import Sequelize from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  define: {
    freezeTableName: true
  },
  timestamps: true,
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});
const models = {
  User: sequelize.import('./user'),
  Group: sequelize.import('./project'),
  Project: sequelize.import('./group'),
  Issue: sequelize.import('./issue')
};
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
})

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
