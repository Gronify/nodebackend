const Router = require("express");
const { ADMIN } = require("../constants/roles");
const servicesСontroller = require("../controllers/services-сontroller");

const authMiddleware = require("../middlewares/auth-middleware");
const checkRoleMiddleware = require("../middlewares/checkRole-middleware");
const router = new Router();

router.post(
  "/",
  authMiddleware,
  checkRoleMiddleware(ADMIN.name),
  servicesСontroller.create
);
router.put(
  "/",
  authMiddleware,
  checkRoleMiddleware(ADMIN.name),
  servicesСontroller.edit
);
router.get(
  "/",
  authMiddleware,
  checkRoleMiddleware(ADMIN.name),
  servicesСontroller.getAll
);

module.exports = router;
