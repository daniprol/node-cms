const layoutsController = require("./layoutsController");

module.exports = {
  index: (req, res) => {
    res.render("default/index", { layout: layoutsController.default });
  },
};
