module.exports = {
  up: async (queryInterface, Sequelize) => 
    await queryInterface.createTable("Project", {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      url:{
        type:Sequelize.STRING
      },
      project_lead:{
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
    await queryInterface.dropTable("Project")
  
};