module.exports =(sequelize, DataTypes) => {
  const Issue = sequelize.define("Issue", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    issue_type: {
      type: DataTypes.ENUM("Story", "Epic", "Bug", "Task"),
      allowNull: false,
      unique: true,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    priority: {
      type: DataTypes.ENUM("Highest", "High", "Medium", "Low", "Lowest")
    },
    resolution: {
      type: DataTypes.ENUM("Fixed","Won't do","Duplicate"),
      defaultValue: "Unresolved"
    },
    status:{
      type:DataTypes.ENUM("Reopened","Resolved","Closed","Active","Open"),
      defaultValue:"Open"
    }
  })
   Issue.associate = models => {
    Issue.belongsTo(models.Project, {
      foreignKey: "projectId"
    });
    Issue.belongsTo(models.User, {
      foreignKey: "reporter"
    });
  }; 
  return Issue;
};