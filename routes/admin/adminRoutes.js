const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/adminController");
const { admin } = require("../../controllers/layoutsController");

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

router
  .route("/posts/edit/:id")
  .get(adminController.editPost)
  .put(adminController.editPostSubmit);
router.route("/posts/delete/:id").delete(adminController.deletePost);

router.route("/category").get(adminController.getCategories);

router.route("/category/create").post(adminController.createCategory);

router
  .route("/category/edit/:id")
  .get(adminController.editCategory)
  .put(adminController.editCategorySubmit);

router.route('/comment')
  .get(adminController.getComments)

module.exports = router;
