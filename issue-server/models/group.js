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
  });
  Group.associate = (models) => {
    Group.belongsToMany(models.User, {
      through: 'member',
      foreignKey: {
        name: 'groupId',
        field: 'group_id'
      },
    });

    Group.belongsTo(models.User, {
      foreignKey: 'owner'
    });
  }
  return Group;
};