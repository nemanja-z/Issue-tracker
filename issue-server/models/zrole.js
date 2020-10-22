module.exports =(sequelize, DataTypes) => {
    const Role = sequelize.define("Role", {
        role:{
            type:DataTypes.ENUM('Admin', 'Manager', 'Developer','Contractor','Support')
          }
    });
    return Role;
  };


