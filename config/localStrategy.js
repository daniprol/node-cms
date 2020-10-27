const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/UserModel')

// Define the local strategy
function initializePassport(passport) {

  // Define the function to authenticate the users:
  const authenticateUser = (req, email, password, done) => {
      User.findOne({ email: email }).then(user => {
          if(!user) {
              return done(null, false, req.flash('error-message', 'Invalid Username or Password'))
          }

          bcrypt.compare(password, user.password, (err, passwordMatched) => {
              if(err) {
                  // return next(err)
                  return done(err)
              }

              if(!passwordMatched) {
                  console.log('Password didnt match');
                  return done(null, false, req.flash('error-message', 'Invalid Username or Password'))
              }
              console.log('Successful login');
              return done(null, user, req.flash('success-message', 'Login Successful'))
          })
      })
  }

  passport.use(new LocalStrategy({
      usernameField: 'email',
      passReqToCallback: true  // It passes the 'req' object to the callback function
  }, authenticateUser ))


  // This uses sessions but we are already using them as middleware in the app for the flash-messages
  // To serialize an user we need to pass the user as an argument and return the user id, so it can be used in a cookie
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // The function to deserialize the user takes the user id as an argument
  passport.deserializeUser(function(id, done) {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  });

}



module.exports = { initializePassport }