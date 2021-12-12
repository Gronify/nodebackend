const { User } = require("../models");
const argon = require("argon2");
const tokenService = require("./token-service");
const ApiError = require("../error/api-error");

class UserService {
  async registration(username, email, password) {
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      throw ApiError.BadRequest(`User with email ${email} already exists`);
    }
    const hashPassword = await argon.hash(password);

    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });

    const userDto = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async login(email, password) {
    const user = await User.findOne({
      raw: true,
      where: { email },
    });

    if (!user) {
      throw ApiError.BadRequest("User with this email was not found");
    }
    const isPassEquals = await argon.verify(user.password, password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Wrong password");
    }
    const userDto = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.Unauthorized();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.Unauthorized();
    }
    const user = await User.findOne({ where: { id: userData.id } });
    const userDto = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    const users = await User.findAll();
    return users;
  }
}

module.exports = new UserService();
