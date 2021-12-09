const Router = require("express");
const applicationСontroller = require("../controllers/application-сontroller");
const router = new Router();

router.post("/", applicationСontroller.create);
router.put("/", applicationСontroller.edit);
router.get("/", applicationСontroller.get);

module.exports = router;
