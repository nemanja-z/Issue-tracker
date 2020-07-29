module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Issue', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true
      },
      issue_type: {
        type: Sequelize.DataTypes.ENUM('Story', 'Epic', 'Bug', 'Task'),
        allowNull: false,
        unique: true,
      },
      summary: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.DataTypes.STRING
      },
      priority: {
        type: Sequelize.DataTypes.ENUM('Highest', 'High', 'Medium', 'Low', 'Lowest')
      },
      resolution: {
        type: Sequelize.DataTypes.ENUM('Unresolved', 'Done', 'Cannot Reproduce', 'Duplicate', 'Won\'t do'),
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
    await queryInterface.dropTable('Issue');
  }
};