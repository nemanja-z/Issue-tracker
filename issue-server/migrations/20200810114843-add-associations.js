module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
        'Issue', 
        'ProjectId', 
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
      ).then(()=>{
        return queryInterface.addColumn(
          'Project', 
          'Project_lead', 
          {
            type: Sequelize.DataTypes.UUID,
            references: {
            model: "User",
            key: "id"
          },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        )
      });
    },
  down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
          'Issue', 
          'ProjectId' 
        ).then(()=>{
          return queryInterface.removeColumn(
            'Project', 
            'Project_lead' 
          )
        });
      }
}