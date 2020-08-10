module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
        'Issue', 
        'project', 
        {
          type: Sequelize.DataTypes.UUID,
          allowNull: false,
          references: {
          model: "Project",
          key: "id"
        },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
    },

  down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
          'Issue', 
          'project' 
        );
      }
}