"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Issue', 'project', {
    type: Sequelize.DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Project',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }).then(() => queryInterface.addColumn('Comment', 'issueId', {
    type: Sequelize.DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Issue',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  })).then(() => queryInterface.addColumn('Project', 'managerId', {
    type: Sequelize.DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  })).then(() => queryInterface.addColumn('Issue', 'reporterId', {
    type: Sequelize.DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  })).then(() => queryInterface.addColumn('Comment', 'commenterId', {
    type: Sequelize.DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  })),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Issue', 'project').then(() => queryInterface.removeColumn('Comment', 'issueId')).then(() => queryInterface.removeColumn('Project', 'managerId')).then(() => queryInterface.removeColumn('Issue', 'reporterId')).then(() => queryInterface.removeColumn('Comment', 'commenterId'))
};