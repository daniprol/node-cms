const layoutsController = require("./layoutsController");
module.exports = {
  index: (req, res) => {
    res.render("admin/index", { layout: layoutsController.admin });
  },
  getPosts: (req, res) => {
    res.send("All posts");
  },
  submitPosts: (req, res) => {
    res.send("Submiting post");
  },
  createPosts: (req, res) => {
    res.render("admin/posts/create", { layout: layoutsController.admin });
  },
};
