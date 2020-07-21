module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('Project', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        public: { type: DataTypes.BOOLEAN },
    });
    Project.associate = models => {
        Project.hasMany(models.Issue);
        Project.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                field: 'user_id'
            }
        });
    };
    return Project;
}