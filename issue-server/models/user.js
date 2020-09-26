module.exports =(sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING(64),
      is: /^[0-9a-f]{64}$/i,
      allowNull: false,
    }
  });
  User.associate = (models) => {
    User.belongsToMany(models.Project, {
      through: "Role"
    });
    User.belongsToMany(models.Issue, {
      through: "Assignee"
    });
}
  return User;
};