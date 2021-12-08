const path = require("path");
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const db = require("../../models");
//const passport = require("passport");
//const { decodeJwt } = require("../../helpers/jwt");

const User = db.users;

exports.register = async (req, res, next) => {
  if (!req.body.email || !req.body.username) {
    let err = new Error("Create request without email or username");
    err.status = 400;
    return next(err);
  }

  const hash = await argon.hash(req.body.password);

  const user = {
    email: req.body.email,
    username: req.body.username,
    password: hash,
    role: "user",
  };

  User.create(user)
    .then((newUser) => {
      const payload = {
        sub: newUser.id,
        exp: Date.now() + parseInt(process.env.JWT_LIFETIME),
        username: newUser.username,
      };

      const accessToken = jwt.sign(
        JSON.stringify(payload),
        process.env.JWT_ACCESS_SECRET,
        {
          algorithm: process.env.JWT_ALGORITHM,
          expiresIn: process.env.JWT_LIFETIME,
        }
      );
      const refreshToken = jwt.sign(
        JSON.stringify(payload),
        process.env.JWT_REFRESH_SECRET,
        {
          algorithm: process.env.JWT_ALGORITHM,
          expiresIn: JWT_REFRESH_LIFETIME,
        }
      );
      console.log("User was created");
      res.status(201).send({ accessToken: accessToken });
    })
    .catch((err) => {
      next(err);
    });
};

exports.login = async (req, res, next) => {};
