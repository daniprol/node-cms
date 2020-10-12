const express = require("express");
const path = require("path");
const createError = require("http-errors");
const logger = require("morgan");
const ejsLayouts = require("express-ejs-layouts");
require("dotenv").config();
require("./database/db-connect");

const app = express();

// SET templating engine
app.use(ejsLayouts);
// app.set("layout", "./layouts/default.ejs"); // By default 'layout.ejs' is used
app.set("view engine", "ejs");
// IT SEEMS WE DON'T NEED TO PUT THIS IF THE NAME OF THE 'views' FOLDER IS NOT CHANGED
// app.set("views", path.join(__dirname, "/anotherViewsFolder"));

/* EXPRESS MIDDLEWARES */
app.use(logger("dev"));
app.use(express.json()); // Configure the body parser with the express built-in middleware:
app.use(express.urlencoded({ extended: true })); // extended URLencoded middleware
// express.static: This is a built-in middleware function in Express. It serves static files and is based on serve-static.
app.use(express.static(path.join(__dirname, "public"))); // We need to serve the 'public' directory as static files

/* ROUTES */
const defaultRoutes = require("./routes/default/defaultRoutes");
const adminRouter = require("./routes/admin/adminRoutes");
app.use("/", defaultRoutes);
app.use("/admin", adminRouter);

app.get("/about", (req, res) => {
  res.render("default/about", { layout: layouts.admin });
});

// 404 route:
app.use(async (req, res, next) => {
  next(createError.NotFound("The requested route doesn't exist!!!!"));
});

// Create a middleware to handle all errors:
app.use((err, req, res, next) => {
  res.status(err.status | 500); // Either the error status or 500 (Internal Server Error)
  // We send back some JSON response for the moment
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

PORT = process.env.APP_PORT | 3000;
app.listen(PORT, () => {
  console.log(`ExpressJS server listening on port ${PORT}`);
});
