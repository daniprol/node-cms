const express = require("express");
const path = require("path");
const hbs = require("express-handlebars");
const createError = require("http-errors");
require("dotenv").config();

const app = express();

/* EXPRESS MIDDLEWARES */
app.use(express.json()); // Configure the body parser with the express built-in middleware:
app.use(express.urlencoded({ extended: true })); // extended URLencoded middleware
// express.static: This is a built-in middleware function in Express. It serves static files and is based on serve-static.
app.use(express.static(path.join(__dirname, "public"))); // We need to serve the 'public' directory as static files

/* Setup the view engine to use handlebars */
app.engine("handlebars", hbs({ defaultLayout: "default" }));
app.set("view engine", "handlebars");

/* ROUTES */
app.use("/", (req, res) => {
  res.send("Main route of the CMS");
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
