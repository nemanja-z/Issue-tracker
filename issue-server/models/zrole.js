module.exports =(sequelize, DataTypes) => {
    const Role = sequelize.define("Role", {
        role:{
            type:DataTypes.ENUM('Admin', 'Manager', 'ProjectLeader', 'Developer', 'Contractor', 'Support')
          }
    });
    return Role;
  };


