module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Comment', {
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV4,
      primaryKey: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    comment: {
      type: Sequelize.DataTypes.STRING,
    },
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('Comment'),
};
