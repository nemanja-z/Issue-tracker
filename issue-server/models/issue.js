module.exports =(sequelize, DataTypes) => {
  const Issue = sequelize.define("Issue", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
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
      allowNull:false
    },
    priority: {
      type: DataTypes.ENUM("Highest", "High", "Medium", "Low", "Lowest"),
      defaultValue: "Lowest"
    },
    resolution: {
      type: DataTypes.ENUM("Fixed","Won't do","Duplicate","Unresolved"),
      defaultValue: "Unresolved"
    }, 
    status:{
      type: DataTypes.ENUM("Reopened","Resolved","Closed","Active","Open"),
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
  });
   Issue.associate = models => {
    Issue.belongsTo(models.Project, {
      foreignKey: "project"
    });
    Issue.belongsToMany(models.User, {
      through: "Assignee"
    });
    Issue.hasMany(models.Comment, {
      foreignKey: 'issueId',
      constraints: false,
    });
  }; 
  return Issue;
};