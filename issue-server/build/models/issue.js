"use strict";

module.exports = (sequelize, DataTypes) => {
  const Issue = sequelize.define("Issue", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    issueNumber: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    issue_type: {
      type: DataTypes.ENUM("Story", "Epic", "Bug", "Task"),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false
    },
    priority: {
      type: DataTypes.ENUM("Highest", "High", "Medium", "Low", "Lowest"),
      defaultValue: "Lowest"
    },
    resolution: {
      type: DataTypes.ENUM("Fixed", "Won't do", "Duplicate", "Unresolved"),
      defaultValue: "Unresolved"
    },
    status: {
      type: DataTypes.ENUM("Reopened", "Resolved", "Closed", "Active", "Open"),
      defaultValue: "Open"
    },
    attachment: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    }
  });

  Issue.associate = models => {
    Issue.belongsTo(models.Project, {
      foreignKey: "project"
    });
    Issue.belongsTo(models.User, {
      as: "reporter",
      foreignKey: "reporterId"
    });
    Issue.belongsToMany(models.User, {
      as: "assignees",
      through: "Assignee"
    });
    Issue.hasMany(models.Comment, {
      foreignKey: 'issueId',
      constraints: false
    });
  };

  return Issue;
};