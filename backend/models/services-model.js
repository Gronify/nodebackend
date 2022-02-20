const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Services = sequelize.define("services", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  sex: { type: DataTypes.STRING },
  price: { type: DataTypes.INTEGER },
});

module.exports = Services;
