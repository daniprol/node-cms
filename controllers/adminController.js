const Post = require("../models/PostModel");
const layoutsController = require("./layoutsController");
module.exports = {
  index: (req, res) => {
    res.render("admin/index", { layout: layoutsController.admin });
  },
  getPosts: (req, res) => {
    // res.send("All posts");
    res.render("admin/posts/index", { layout: layoutsController.admin });
  },
  submitPosts: (req, res) => {
    console.log(req.body);
    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
    });
    // res.send("Submiting post");

    // TODO: check why we have 2 entries in the db for each post!
    newPost.save().then((post) => {
      console.log("Post saved to db successfully");
      console.log(post);

      req.flash("success-messsage", "Post created successfully"); // We flash the REQuest!!!
      res.redirect("/admin/posts");
    });
  },
  createPosts: (req, res) => {
    res.render("admin/posts/create", { layout: layoutsController.admin });
  },
};
