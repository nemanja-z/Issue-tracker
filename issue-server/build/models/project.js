"use strict";

module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define("Project", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING
    },
    isActive: {
      type: DataTypes.BOOLEAN
    }
  });

  Project.associate = models => {
    Project.hasMany(models.Issue, {
      foreignKey: "project"
    });
    Project.belongsTo(models.User, {
      as: "manager",
      foreignKey: "managerId"
    });
    Project.belongsToMany(models.User, {
      as: "member",
      through: "Member"
    });
  };

  return Project;
};