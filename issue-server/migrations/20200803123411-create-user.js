module.exports = {
  up: async (queryInterface, Sequelize) => 
    await queryInterface.createTable("User", {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true
      },
      username: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      isVerified:{
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
      },
      resetPasswordToken: Sequelize.DataTypes.STRING,
      role:{
        type: Sequelize.DataTypes.ENUM('Admin', 'Manager', 'Leader', 'Developer', 'Contractor', 'Support'),
        allowNull: false
      },
      passwordHash: {
        type: Sequelize.DataTypes.STRING(64),
        is: /^[0-9a-f]{64}$/i,
        allowNull: false,
      },
      profile:{
        type: Sequelize.DataTypes.STRING()
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: async (queryInterface, Sequelize) => 
    await queryInterface.dropTable("User")
};