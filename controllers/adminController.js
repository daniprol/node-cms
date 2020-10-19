const { NotExtended } = require("http-errors");
const Post = require("../models/PostModel");
const layoutsController = require("./layoutsController");
const createError = require("http-errors");

module.exports = {
  index: (req, res) => {
    res.render("admin/index", { layout: layoutsController.admin });
  },
  getPosts: (req, res) => {
    Post.find().then(posts => {
    res.render("admin/posts/index", { layout: layoutsController.admin , posts: posts});
    })
    // res.render("admin/posts/index", { layout: layoutsController.admin });
  },
  submitPosts: (req, res, next) => {
    console.log(req.body);
    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      allowComments: req.body.allowComments === 'on'
    });
    // res.send("Submiting post");

    // TODO: check why we have 2 entries in the db for each post!
    newPost.save().then((post) => {
      console.log("Post saved to db successfully");
      console.log(post);

      req.flash("success-message", "Post created successfully"); // We flash the REQuest!!!
      res.redirect("/admin/posts");
    }).catch(err => {
      console.log(err.message);
      // next(createError[err.status])
      // next(createError.BadRequest(err.message))

      req.flash("error-message", err.message); // We flash the REQuest!!!
      res.redirect("/admin/posts");

      
    });
  },
  createPosts: (req, res) => {
    res.render("admin/posts/create", { layout: layoutsController.admin });
  },
  editPost: (req, res) => {
    // We are going to receive a parameter in the route:
    const id = req.params.id;

    Post.findById(id).then(post => {
      console.log(post);
      res.render('admin/posts/edit', { layout: layoutsController.admin, post: post });
    })

  },
  deletePost: (req, res) => {
    Post.findByIdAndDelete(req.params.id).then(deletedPost => {
      req.flash('success-message', `The post ${deletedPost.title} has been deleted`);
      res.redirect('/admin/posts')
    })
  }
};
