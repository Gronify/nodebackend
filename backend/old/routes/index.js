var router = require("express").Router();
//const doc = require("../doc/doc");
const db = require("../models");
const auth = require("./api/auth");
//router.get("/doc", doc.doc);

// auth
router.post("/register", auth.register);

module.exports = router;
