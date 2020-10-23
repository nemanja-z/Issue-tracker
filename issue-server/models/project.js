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
    }, 
    isActive:{
      type: DataTypes.BOOLEAN
    }
  });
   Project.associate = models => {
    Project.hasMany(models.Issue,{
      foreignKey: "project"
    });
    Project.belongsTo(models.User,{
      as:"projectLead",
      foreignKey:"projectLeadId"
    });
    Project.belongsToMany(models.User,{
      through:"Role"
    });
  }; 
  return Project;
};