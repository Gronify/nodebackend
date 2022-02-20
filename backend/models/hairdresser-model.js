const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Hairdresser = sequelize.define("hairdresser", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  surname: { type: DataTypes.STRING },
  sex: { type: DataTypes.STRING },
  salary: { type: DataTypes.INTEGER },
});

module.exports = Hairdresser;
