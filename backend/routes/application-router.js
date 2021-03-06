const Router = require("express");
const { ADMIN, HAIRDRESSER_UNIVERSAL } = require("../constants/roles");
const applicationСontroller = require("../controllers/application-сontroller");
const authMiddleware = require("../middlewares/auth-middleware");
const checkRoleMiddleware = require("../middlewares/checkRole-middleware");
const router = new Router();

router.post("/", applicationСontroller.create);
router.put(
  "/",
  authMiddleware,
  checkRoleMiddleware(HAIRDRESSER_UNIVERSAL.name),
  applicationСontroller.edit
);
router.get(
  "/",
  authMiddleware,
  checkRoleMiddleware(HAIRDRESSER_UNIVERSAL.name),
  applicationСontroller.getAll
);
router.get(
  "/notReady",
  authMiddleware,
  checkRoleMiddleware(HAIRDRESSER_UNIVERSAL.name),
  applicationСontroller.getAllNotReady
);
router.put(
  "/applicationConnected",
  authMiddleware,
  checkRoleMiddleware(HAIRDRESSER_UNIVERSAL.name),
  applicationСontroller.connectApplicationToHairdresser
);

router.put(
  "/applicationHairdresser",
  authMiddleware,
  checkRoleMiddleware(HAIRDRESSER_UNIVERSAL.name),
  applicationСontroller.connectApplicationToHairdresserByUser
);

module.exports = router;
