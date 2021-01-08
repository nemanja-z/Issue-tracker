require('dotenv').config();
module.exports = {
  development: {
    database:'issue-dev',
    use_env_variable:'DB_DEV_URL',
    define: {
      freezeTableName: true
    },
    dialect:'postgres'
  },
  test: {
    database:'issue-test',
    use_env_variable:'DB_TEST_URL',
    define: {
      freezeTableName: true
    },
    dialect:'postgres'
  },
  production: {
    use_env_variable:PRODUCTION_DB,
    define: {
      freezeTableName: true
    },
    dialect:'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
}
