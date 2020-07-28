require('dotenv').config();
module.exports = {
  development: {
    database:'issue-dev',
    use_env_variables:'DB_DEV_URL',
    define: {
      freezeTableName: true
    },
    dialect:'postgres'
  },
  test: {
    database:'issue-test',
    use_env_variables:'DB_TEST_URL',
    define: {
      freezeTableName: true
    },
    dialect:'postgres'
  },
  production: {
    database:process.env.db,
    use_env_variables:'DB_DEV_URL',
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
