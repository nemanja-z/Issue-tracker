"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Assignee', {
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    UserId: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV4,
      primaryKey: true
    },
    IssueId: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV4,
      primaryKey: true
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Assignee')
};