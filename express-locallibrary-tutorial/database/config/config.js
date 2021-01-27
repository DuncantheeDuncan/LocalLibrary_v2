require('dotenv').config()//;

// var config =  require('./config');

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    port:5432,//3000
    dialect: 'postgres',
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
}