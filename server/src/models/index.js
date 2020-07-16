require('dotenv').config();
const { Sequelize } = require('sequelize');
sequelize = new Sequelize(process.env.DATABASE_URL, {
    define: {
        freezeTableName: true
    },
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
    Group: sequelize.import('./group'),
    Issue: sequelize.import('./issue'),
    Project: sequelize.import('./project'),
    User: sequelize.import('./user'),
};

Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
