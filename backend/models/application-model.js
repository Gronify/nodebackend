const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Application = sequelize.define("application", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  text: { type: DataTypes.STRING, allowNull: false },
  vaccinated: { type: DataTypes.BOOLEAN, defaultValue: false },
});

module.exports = Application;
