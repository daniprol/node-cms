const express = require("express");
const router = express.Router();
const defaultController = require("../../controllers/defaultController");

// router.get("/", defaultController.index);
// router.route("/").get(defaultController.index);
router.route("/").get(defaultController.indexAlt);

router
  .route("/login")
  .get(defaultController.loginGet)
  .post(defaultController.loginPost);

router
  .route("/register")
  .get(defaultController.registerGet)
  .post(defaultController.registerPost);

module.exports = router;
