const Router = require("express");
const { ADMIN, HAIRDRESSER_UNIVERSAL } = require("../constants/roles");
const servicesСontroller = require("../controllers/services-сontroller");

const authMiddleware = require("../middlewares/auth-middleware");
const checkRoleMiddleware = require("../middlewares/checkRole-middleware");
const router = new Router();

router.post(
  "/",
  authMiddleware,
  checkRoleMiddleware(HAIRDRESSER_UNIVERSAL.name),
  servicesСontroller.create
);
router.put(
  "/",
  authMiddleware,
  checkRoleMiddleware(HAIRDRESSER_UNIVERSAL.name),
  servicesСontroller.edit
);
router.get(
  "/",
  authMiddleware,
  checkRoleMiddleware(HAIRDRESSER_UNIVERSAL.name),
  servicesСontroller.getAll
);

module.exports = router;
