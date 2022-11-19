const { Sequelize } = require("sequelize")
const { config } = require('../config/config');
const setupModels = require('../db/models/index');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `${config.dbType}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: config.dbType,
  logging: true,
});

setupModels(sequelize);

sequelize.sync()

module.exports = sequelize;
