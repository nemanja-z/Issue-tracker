module.exports = {
  up: async (queryInterface, Sequelize) => 
    await queryInterface.createTable("Group", {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: async (queryInterface, Sequelize) => 
    await queryInterface.dropTable("Group")
};