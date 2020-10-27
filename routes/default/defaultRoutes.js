const express = require("express");
const router = express.Router();
const defaultController = require("../../controllers/defaultController");
const passport = require('passport')
const { initializePassport } = require('../../config/localStrategy')
const { isAuth, isNotAuth } = require('../../utils/authenticationFunctions')

// Initialize the local strategy:
initializePassport(passport)

// router.get("/", defaultController.index);
// router.route("/").get(defaultController.index);
router.route("/").get(defaultController.indexAlt);

// Definimos la funcion a usar por la ruta del login:
const localAuthentication = 
passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login',
    failureFlash: true,
    sucessFlash: true,
    session: true
  })


router
  .route("/login")
  .get(isNotAuth, defaultController.loginGet)
  .post(localAuthentication)
  // .post(passport.authenticate('local', {
  //   successRedirect: '/admin',
  //   failureRedirect: '/login',
  //   failureFlash: true,
  //   successFlash: true
  // }));

  router.route( '/logout')
  .get(isAuth, (req, res) => {
	req.logout() // REQ !!
  res.redirect('/')})
  

router
  .route( "/register")
  .get(isNotAuth, defaultController.registerGet)
  .post(defaultController.registerPost);

module.exports = router;
