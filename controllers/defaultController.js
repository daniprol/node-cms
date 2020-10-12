const layoutsController = require("./layoutsController");

module.exports = {
  index: (req, res) => {
    res.render("default/index", { layout: layoutsController.default });
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
