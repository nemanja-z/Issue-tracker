module.exports =(sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
        comment:{
            type:DataTypes.STRING
          }
    });
    Comment.associate = models => {
        Comment.belongsToMany(models.Issue, {
          through: "Post"
        });
    }
    return Comment;
  };