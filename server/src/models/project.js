module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('Project', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.TIME,
            allowNull: true,
            defaultValue: sequelize.fn('now')
        }
    });
    Project.associate = models => {
        Project.hasMany(models.Issues);
        Project.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                field: 'user_id'
            }
        });
    };
    return Project;
}