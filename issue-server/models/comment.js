module.exports =(sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
        comment:{
            type:DataTypes.STRING
          }
    });
    
    return Comment;
  };