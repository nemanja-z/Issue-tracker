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
      foreignKey: "ProjectId"
    });
    Project.belongsToMany(models.User,{
      through:"Member"
    });
    Project.belongsTo(models.User,{
      foreignKey: "Project_lead"
    })
  }; 
  return Project;
};