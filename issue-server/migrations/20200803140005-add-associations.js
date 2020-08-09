module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Project', 
      'project_lead', 
      {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: "User",
          key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    ).then(() => {
      return queryInterface.addColumn(
        'Issue', 
        'projectId', 
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
    }).then(() => {
        return queryInterface.addColumn(
          'User', 
          'member', 
          {
            type: Sequelize.DataTypes.UUID,
            references: {
            model: "Group",
            key: "id"
        },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
    }).then(() => {
      return queryInterface.addColumn(
        'Issue', 
        'reporter', 
        {
          type: Sequelize.DataTypes.UUID,
          references: {
          model: "User",
          key: "id"
      },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
  }).then(() => {
  return queryInterface.addColumn(
    'Issue', 
    'assignedTo', 
    {
      type: Sequelize.DataTypes.UUID,
      references: {
      model: "User",
      key: "id"
  },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    }
  );
})},

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Project', 
      'project_lead'
    )
      .then(() => {
        return queryInterface.removeColumn(
          'Issue', 
          'projectId' 
        );
      }).then(() => {
        return queryInterface.removeColumn(
          'User', 
          'member' 
        );
      }).then(() => {
        return queryInterface.removeColumn(
          'Issue', 
          'reporter' 
        );
      }).then(() => {
        return queryInterface.removeColumn(
          'Issue', 
          'assignedTo' 
        );
      })
  }
}