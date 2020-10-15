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
    },
    profile:{
      type: DataTypes.STRING
    }
  });
  User.associate = (models) => {
    User.belongsToMany(models.Project, {
      through: "Role"
    });
    User.hasMany(models.Project, {
      as:"projectLead",
      foreignKey:"projectLeadId"
    });
    User.hasMany(models.Issue, {
      as:"reporter",
      foreignKey:"reporterId"
    });
    User.hasMany(models.Issue, {
      as:"commenter",
      foreignKey:"commenterId"
    });
    User.belongsToMany(models.Issue, {
      through: "Assignee"
    });
}
  return User;
};