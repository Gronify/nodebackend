const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Application = sequelize.define("application", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  surname: { type: DataTypes.STRING },
  order: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER },
  status: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Application;
