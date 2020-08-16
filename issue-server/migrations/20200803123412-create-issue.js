module.exports = {
  up: async (queryInterface, Sequelize) => 
    await queryInterface.createTable("Issue", {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true
      },
      issue_type: {
        type: Sequelize.DataTypes.ENUM("Story", "Epic", "Bug", "Task"),
        allowNull: false
      },
      description: {
        type: Sequelize.DataTypes.STRING
      },
      priority: {
        type: Sequelize.DataTypes.ENUM("Highest", "High", "Medium", "Low", "Lowest"),
        defaultValue: "Lowest"
      },
      status:{
        type: Sequelize.DataTypes.ENUM("Reopened","Resolved","Closed","Active","Open"),
        defaultValue:"Open"
      },
      resolution: {
        type: Sequelize.DataTypes.ENUM("Fixed", "Won't do", "Duplicate", "Unresolved"),
        defaultValue: "Unresolved"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      reporter:{
        type: Sequelize.DataTypes.UUID,
          allowNull: false,
          references: {
            model: "User",
            key: "id"
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
      }
    }),
  down: async (queryInterface, Sequelize) => 
  await queryInterface.dropTable("Issue") 
};