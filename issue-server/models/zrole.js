module.exports =(sequelize, DataTypes) => {
    const Role = sequelize.define("Role", {
        role:{
            type:DataTypes.ENUM('Admin', 'Manager', 'Leader', 'Developer', 'Contractor', 'Support')
          }
    });
    return Role;
  };


