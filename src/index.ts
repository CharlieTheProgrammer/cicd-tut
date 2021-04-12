const { Sequelize, Model, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

async function app() {
  // Get env var from .env
  dotenv.config();
  const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_FORCE_RESTART } = process.env;

  const config = {
    host: DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8'
    },
    pool: {
      max: 50,
      min: 0,
      acquire: 15000,
      idle: 10000
    },
    logging: false
  };

  const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, config);
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

(async function () {
  try {
    await app();
  } catch (error) {
    console.log(error);
  }
})();