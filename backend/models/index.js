const User = require("./user-model");
const Token = require("./token-model");
const Application = require("./application-model");

User.hasMany(Token);
Token.belongsTo(User);

module.exports = {
  User,
  Token,
  Application,
};
