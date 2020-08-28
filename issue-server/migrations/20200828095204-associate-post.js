module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Post',
      {
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        CommentId: {
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.DataTypes.UUIDV4,
          primaryKey: true
        },
        IssueId: {
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.DataTypes.UUIDV4,
          primaryKey: true
        },
        comment:{
          type:Sequelize.DataTypes.STRING
        }
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Post');
  },
};