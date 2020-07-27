require('dotenv').config();
module.exports={
  "development": {
    "database": "issue-dev",
    "use_env_variables":"DB_DEV_URL",
    "define": {
      "freezeTableName": true
    },
    "dialect": 'postgres'
  },
  "test": {
    "database": "issue-test",
    "use_env_variables":"DB_TEST_URL",
    "define": {
      "freezeTableName": true
    },
    "dialect": 'postgres'

  },
  "production": {
    "database": "dep4udm10fpkta",
    "use_env_variables":"DB_DEV_URL",
    "define": {
      "freezeTableName": true
    },
    "dialect": 'postgres',
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  }
}
