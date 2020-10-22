const layoutsController = require("./layoutsController");
const Post = require("../models/PostModel");
const Category = require("../models/CategoryModel");

module.exports = {
  index: async (req, res, next) => {
    try {
      const posts = await Post.find();
      const categories = await Category.find();

      res.render("default/index", {
        layout: layoutsController.default,
        posts: posts,
        categories: categories,
      });
    } catch (error) {
      return next(error);
    }
  },

  indexAlt: (req, res, next) => {
    Promise.all([Post.find(), Category.find()])
      .then((result) => {
        const posts = result[0];
        const categories = result[1];

        res.render("default/index", {
          layout: layoutsController.default,
          posts: posts,
          categories: categories,
        });
      })
      .catch((err) => {
        next(err);
      });
  },
  loginGet: (req, res) => {
    res.render("default/login", { layout: layoutsController.default });
  },
  loginPost: (req, res) => {
    res.send("This is the POST login route");
  },
  registerGet: (req, res) => {
    res.render("default/register", { layout: layoutsController.default });
  },
  registerPost: (req, res) => {
    res.send("This is the POST register route");
  },
};
