const User = require("./user-model");
const Token = require("./token-model");
const Application = require("./application-model");
const Hairdresser = require("./hairdresser-model");
const Services = require("./services-model");

User.hasMany(Token);
Token.belongsTo(User);

User.hasOne(Hairdresser);
Hairdresser.belongsTo(User);

Hairdresser.hasMany(Application);
Application.belongsTo(Hairdresser);

module.exports = {
  User,
  Token,
  Application,
  Hairdresser,
  Services,
};
