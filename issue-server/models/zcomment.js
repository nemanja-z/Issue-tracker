module.exports =(sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      comment:{
          type:DataTypes.STRING
        }
    });
    Comment.associate = models => {
      Comment.belongsTo(models.Issue, {
        foreignKey: "issueId",
        constraints: false
      });
      Comment.belongsTo(models.User, {
        as:"commenter"
      });
    }
    return Comment;
  };