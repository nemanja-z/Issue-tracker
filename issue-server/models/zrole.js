module.exports =(sequelize, DataTypes) => {
    const Role = sequelize.define("Role", {
        role:{
            type:DataTypes.ENUM('Admin', 'Leader', 'Developer', 'Contractor', 'Support')
          }
    });
    return Role;
  };


