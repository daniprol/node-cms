const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/adminController");

// If we wanted to set the layout manually to all the admin routes:
// router.all("/*", (req, res, next) => {
//   req.app.locals.layout = "admin";
// });

router.route("/").get(adminController.index);

router.route("/posts").get(adminController.getPosts);

router
  .route("/posts/create")
  .get(adminController.createPosts)
  .post(adminController.submitPosts);

router.route('/posts/edit/:id').get(adminController.editPost)

module.exports = router;
