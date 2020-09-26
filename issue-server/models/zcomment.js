module.exports =(sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      comment:{
          type:DataTypes.STRING
        },
      commenter:{
        type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "User",
            key: "id"
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
      }
    });
    Comment.associate = models => {
      Comment.belongsTo(models.Issue, {
        foreignKey: "issueId",
        constraints: false
      });
    }
    return Comment;
  };