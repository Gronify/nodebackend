const Router = require("express");
const router = new Router();
const userRouter = require("./user-router");
const applicationRouter = require("./application-router");
const hairdresserRouter = require("./hairdresser-router");
const servicesRouter = require("./services-router");

router.use("/user", userRouter);
router.use("/application", applicationRouter);
router.use("/hairdresser", hairdresserRouter);
router.use("/services", servicesRouter);

module.exports = router;
