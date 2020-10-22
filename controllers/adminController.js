const Post = require("../models/PostModel");
const Category = require("../models/CategoryModel");
const layoutsController = require("./layoutsController");
const createError = require("http-errors");

module.exports = {
  index: (req, res) => {
    res.render("admin/index", { layout: layoutsController.admin });
  },
  getPosts: (req, res) => {
    Post.find()
      .populate("category")
      .then((posts) => {
        res.render("admin/posts/index", {
          layout: layoutsController.admin,
          posts: posts,
        });
      });
    // res.render("admin/posts/index", { layout: layoutsController.admin });
  },
  submitPosts: (req, res, next) => {
    console.log(req.body);
    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      allowComments: req.body.allowComments === "on",
      category: req.body.category,
    });
    // res.send("Submiting post");

    // TODO: check why we have 2 entries in the db for each post!
    newPost
      .save()
      .then((post) => {
        console.log("Post saved to db successfully");
        console.log(post);

        req.flash("success-message", "Post created successfully"); // We flash the REQuest!!!
        res.redirect("/admin/posts");
      })
      .catch((err) => {
        console.log(err.message);
        // next(createError[err.status])
        // next(createError.BadRequest(err.message))

        req.flash("error-message", err.message); // We flash the REQuest!!!
        res.redirect("/admin/posts");
      });
  },
  createPosts: async (req, res) => {
    const categories = await Category.find();
    res.render("admin/posts/create", {
      layout: layoutsController.admin,
      categories: categories,
    });
  },
  editPost: async (req, res) => {
    // We are going to receive a parameter in the route:
    const id = req.params.id;
    const post = await (await Post.findById(id)).populate("category");
    const categories = await Category.find();
    console.log(categories);
    console.log(post.category._id);
    res.render("admin/posts/edit", {
      layout: layoutsController.admin,
      post: post,
      categories: categories,
    });
  },

  editPostSubmit: (req, res) => {
    const id = req.params.id;

    Post.findById(id).then((post) => {
      post.title = req.body.title;
      post.status = req.body.status;
      post.description = req.body.description;
      post.allowComments = req.body.allowComments === "on";
      post.category = req.body.category;

      post.save().then((updatedPost) => {
        console.log("Post updated", updatedPost);

        req.flash(
          "success-message",
          `The post ${updatedPost.title} has been updated`
        );
        res.redirect("/admin/posts");
      });
    });
  },

  deletePost: (req, res) => {
    Post.findByIdAndDelete(req.params.id).then((deletedPost) => {
      req.flash(
        "success-message",
        `The post ${deletedPost.title} has been deleted`
      );
      res.redirect("/admin/posts");
    });
  },

  // ALL CATEGORIES METHODS:
  getCategories: (req, res) => {
    Category.find().then((cats) => {
      res.render("admin/category/index", {
        layout: layoutsController.admin,
        categories: cats,
      });
    });
  },

  createCategory: (req, res) => {
    console.log(req.body);

    const newCategory = new Category({
      title: req.body.title,
    });

    newCategory
      .save()
      .then((cat) => {
        console.log("New category created", cat);
        res.redirect("/admin/category/");
      })
      .catch((err) => {
        console.log(err.message);
        req.flash("error-message", err.message); // We flash the REQuest!!!
        res.redirect("/admin/category/");
        // Alternative:
        // next(err)
      });
  },
  editCategory: async (req, res) => {
    console.log(`You want to edit the category ${req.params.id}`);
    try {
      const id = req.params.id;

      const categories = await Category.find();

      const categoryToEdit = await Category.findById(id);
      res.render("admin/category/edit", {
        layout: layoutsController.admin,
        categories: categories,
        categoryToEdit: categoryToEdit,
      });
    } catch (error) {
      console.log(err.message);
      req.flash("error-message", err.message); // We flash the REQuest!!!
      res.redirect("/admin/category/");
    }
  },

  editCategorySubmit: (req, res, next) => {
    console.log(req.body);

    const id = req.params.id;

    const newTitle = req.body.title;

    if (!newTitle) {
      req.flash("error-message", "The category must have a title!");
      res.redirect(`/admin/category/edit/${id}`);
      return;
    }
    Category.findByIdAndUpdate(
      id,
      { title: req.body.title },
      (err, catSaved) => {
        if (err) {
          console.log(err.message);
          req.flash("error-message", err.message); // We flash the REQuest!!!
          // return next(err)
        }
        console.log("Category updated", catSaved);
        req.flash(
          "success-message",
          `Category title updated successfully to ${newTitle}`
        );
        res.redirect("/admin/category/");
      }
    );
  },
};
