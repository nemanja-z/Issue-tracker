"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    role: {
      type: DataTypes.ENUM('Admin', 'Manager', 'Leader', 'Developer', 'Contractor', 'Support'),
      allowNull: false
    },
    passwordHash: {
      type: DataTypes.STRING(64),
      is: /^[0-9a-f]{64}$/i,
      allowNull: false
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    profile: {
      type: DataTypes.STRING
    },
    resetPasswordToken: DataTypes.STRING
  });

  User.associate = models => {
    User.hasMany(models.Project, {
      as: 'manager',
      foreignKey: 'managerId'
    });
    User.hasMany(models.Issue, {
      as: 'reporter',
      foreignKey: 'reporterId'
    });
    User.hasMany(models.Comment, {
      as: 'commenter',
      foreignKey: 'commenterId'
    });
    User.belongsToMany(models.Issue, {
      as: 'assignees',
      through: 'Assignee'
    });
    User.belongsToMany(models.Project, {
      as: 'member',
      through: 'Member'
    });
  };

  return User;
};