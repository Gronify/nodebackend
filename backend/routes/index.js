const Router = require("express");
const router = new Router();
const userRouter = require("./user-router");
const applicationRouter = require("./application-router");

router.use("/user", userRouter);
router.use("/application", applicationRouter);

module.exports = router;
