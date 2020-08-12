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
    },
    reporter:{
      type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "User",
          key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    }
  })
   Issue.associate = models => {
    Issue.belongsTo(models.Project, {
      foreignKey: "ProjectId"
    });
    Issue.belongsToMany(models.User, {
      through: "Assignee"
    });
  }; 
  return Issue;
};