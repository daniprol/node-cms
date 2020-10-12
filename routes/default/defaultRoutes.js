const express = require("express");
const router = express.Router();
const defaultController = require("../../controllers/defaultController");

// router.get("/", defaultController.index);
router.route("/").get(defaultController.index);

module.exports = router;
