'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Issues', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      issue_type: {
        type: DataTypes.ENUM('Story', 'Epic', 'Bug', 'Task'),
        allowNull: false,
        unique: true,
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING
      },
      priority: {
        type: DataTypes.ENUM('Highest', 'High', 'Medium', 'Low', 'Lowest')
      },
      resolution: {
        type: DataTypes.ENUM('Unresolved', 'Done', 'Cannot Reproduce', 'Duplicate', 'Won\'t do'),
        defaultValue: "Unresolved"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Issues');
  }
};