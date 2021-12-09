const Router = require("express");
const applicationСontroller = require("../controllers/application-сontroller");
const router = new Router();

router.post("/", applicationСontroller.create);

module.exports = router;
