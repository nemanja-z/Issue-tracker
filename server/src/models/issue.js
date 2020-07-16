module.exports = (sequelize, DataTypes) => {
    const Issue = sequelize.define('Issue', {
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
    Issue.associate = models => {
        Issue.belongsTo(models.Project, {
            foreignKey: {
                name: 'projectId',
                field: 'project_id'
            }
        });
        Issue.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                field: 'user_id'
            }
        });
    };
    return Issue;
}