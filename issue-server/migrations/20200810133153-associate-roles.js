module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Role',
      {
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        UserId: {
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.DataTypes.UUIDV4,
          primaryKey: true
        },
        ProjectId: {
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.DataTypes.UUIDV4,
          primaryKey: true
        },
        role:{
          type: Sequelize.DataTypes.ENUM('Admin', 'Manager', 'Leader', 'Developer', 'Contractor', 'Support')
        }
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
        return Promise.all([
            queryInterface.dropTable('Role'),
            queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Role_role";'),
        ]);
    });
}
}