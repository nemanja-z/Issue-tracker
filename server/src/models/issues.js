module.exports = (sequelize, DataTypes) => {
    const Issues = sequelize.define('Issues', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        typee: {
            type: DataTypes.STRING
        },
        priority: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        },
        resolution: {
            type: DataTypes.STRING

        },
        comment: {
            type: DataTypes.STRING
        },
        picture: {
            type: DataTypes.STRING
        },
        link: {
            type: DataTypes.STRING
        }
    })
    Issues.associate = models => {
        Issues.belongsTo(models.Project, {
            foreignKey: {
                name: 'projectId',
                field: 'project_id'
            }
        });
        Issues.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                field: 'user_id'
            }
        });
    };
    return Issues;
}