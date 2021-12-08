const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: process.env.DB_DIALECT,
    operatorsAliases: false,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    operatorsAliases: false,
    timestamps: true,
    //logging: false,
  }
);
