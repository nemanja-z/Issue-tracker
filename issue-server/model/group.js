module.exports =(sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    owner:{
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  });
  Group.associate = (models) => {
    Group.hasMany(models.User, {
      foreignKey: 'member'
    });

    Group.belongsTo(models.User, {
      foreignKey: 'owner'
    });
  }
  return Group;
};