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
        },
      ).then(()=>{
        return queryInterface.addColumn(
          'Comment', 
          'issueId', 
          {
            type: Sequelize.DataTypes.UUID,
            allowNull: false,
            references: {
            model: "Issue",
            key: "id"
          },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        )
      })},
  down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
          'Issue', 
          'project' 
        ).then(()=>{
          return queryInterface.removeColumn(
            'Comment', 
            'issueId' 
          )
        })}}