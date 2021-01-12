"use strict";

require('dotenv').config();

module.exports = {
  development: {
    use_env_variable: "DB_DEV_URL",
    define: {
      freezeTableName: true
    },
    dialect: "postgres"
  },
  test: {
    use_env_variable: "DB_TEST_URL",
    define: {
      freezeTableName: true
    },
    dialect: "postgres"
  },
  "production": {
    use_env_variable: "DATABASE_URL",
    define: {
      freezeTableName: true
    },
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};