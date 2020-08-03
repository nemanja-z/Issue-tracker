module.exports =(sequelize, DataTypes) => {
  const Group = sequelize.define("Group", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  }); 
  Group.associate = (models) => {
    Group.hasMany(models.User, {
      foreignKey: "member"
    }); 
  }
  return Group;
};