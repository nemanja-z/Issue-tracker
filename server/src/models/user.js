module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('Project', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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
        User.belongsToMany(models.Team, {
            through: 'member',
            foreignKey: {
                name: 'userId',
                field: 'user_id',
            },
        });
        // N:M
        User.belongsToMany(models.Issues, {
            through: 'channel_member',
            foreignKey: {
                name: 'userId',
                field: 'user_id',
            },
        });
    };

    return User;
}