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
      }).then(()=>{
        return queryInterface.addColumn(
          'Project', 
          'managerId', 
          {
            type: Sequelize.DataTypes.UUID,
            allowNull: false,
            references: {
            model: "User",
            key: "id"
          },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        )
      }).then(()=>{
        return queryInterface.addColumn(
          'Issue', 
          'reporterId', 
          {
            type: Sequelize.DataTypes.UUID,
            allowNull: false,
            references: {
            model: "User",
            key: "id"
          },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        )
      }).then(()=>{
        return queryInterface.addColumn(
          'Comment', 
          'commenterId', 
          {
            type: Sequelize.DataTypes.UUID,
            allowNull: false,
            references: {
            model: "User",
            key: "id"
          },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        )
      })
    },
  down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
          'Issue', 
          'project' 
        ).then(()=>{
          return queryInterface.removeColumn(
            'Comment', 
            'issueId' 
          )
        }).then(()=>{
          return queryInterface.removeColumn(
            'Project', 
            'managerId' 
          )
        }).then(()=>{
          return queryInterface.removeColumn(
            'Issue', 
            'reporterId' 
          )
        }).then(()=>{
          return queryInterface.removeColumn(
            'Comment', 
            'commenterId' 
          )
        })
      }}