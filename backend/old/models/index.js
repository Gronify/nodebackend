const Sequelize = require("sequelize");
const config = require("../config");
const argon = require("argon2");

const sequelize = new Sequelize(
  config.db.DB,
  config.db.USER,
  config.db.PASSWORD,
  {
    host: config.db.HOST,
    dialect: config.db.dialect,
    operatorsAliases: 0,

    pool: {
      max: config.db.pool.max,
      min: config.db.pool.min,
      acquire: config.db.pool.acquire,
      idle: config.db.pool.idle,
    },
    timestamps: true,
    logging: console.log,
  }
);

const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

db.users = require("./User")(sequelize, Sequelize);
db.users.sync();

module.exports = db;
