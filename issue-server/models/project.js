module.exports =(sequelize, DataTypes) => {
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
    url:{
      type:DataTypes.STRING
    }
  });
   Project.associate = models => {
    Project.hasMany(models.Issue,{
      foreignKey: "projectId"
    });
    Project.belongsTo(models.User, {
      foreignKey: "project_lead"
    });
  }; 
  return Project;
};