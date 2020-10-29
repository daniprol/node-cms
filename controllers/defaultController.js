const layoutsController = require("./layoutsController");
const Post = require("../models/PostModel");
const User = require('../models/UserModel')
const Category = require("../models/CategoryModel");
const Comment = require('../models/CommentModel')
const createError = require('http-errors')

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
    Promise.all([Post.find().sort({'createdAt': 'desc'}), Category.find()])
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
    let errors = []

    if (!req.body.firstName) {
      errors.push({ message: 'First name is mandatory'})
    }
    if (!req.body.lastName) {
      errors.push({ message: 'Last name is mandatory'})
    }
    if (!req.body.email) {
      errors.push({ message: 'Email is mandatory'})
    }
    if (req.body.password !== req.body.passwordConfirm) {
      errors.push({ message: 'Passwords do not match each other'})
    }

    if (errors.length > 0) {

      console.log('Registration form errors:', errors);
      res.render('default/register', 
      { layout: layoutsController.default, 
        errors: errors, 
        firstName: req.body.firstName, 
        lastName: req.body.lastName, 
        email: req.body.email})
    } else {
      User.findOne({ email: req.body.email}).then(user => {
        if (user) {
          console.log(`Email ${req.body.email} is already in the db`);
        req.flash('error-message', 'That email is already registered!')
        res.redirect('/register')
        } else {
        //   const newUser = new User({
        // firstName: req.body.firstName, 
        // lastName: req.body.lastName, 
        // email: req.body.email,
        // password: req.body.password
        //   })

          // Can I use new User(req.body) if there's extra fields like req.body.passwordConfirm???
          // Yes we can!
          const newUser = new User(req.body)

        newUser.save().then(user => {
          console.log('New user registered', user);
          req.flash('success-message', `${ user.email } account was created successfully. You can now log in`)
          res.redirect('/login')
        })
        }
      })
    }
  },

  singlePost: async (req, res, next) => {
    try {
      const id = req.params.id;
      const post = await Post.findById(id)
      const comments = await Comment.find().populate('user')
      res.render('default/singlePost', { 
        layout: layoutsController.default,
        post: post,
        comments: comments
      })
    } catch (error) {
      next(createError.NotFound('The post you requested does not exist!'))
    }

  },


  // SUBMIT A COMMENT IN A POST
  submitComment: async (req, res) => {
    try {
      if(req.user) {
        const post = await Post.findById(req.params.id)
        console.log('You want to add a comment in this post', post);
        const newComment = new Comment({
          user: req.user.id,
          body: req.body.comment_body,
          commentIsApproved: true
        })
        const savedComment = await newComment.save()
        console.log('You just submitted the next comment:' , savedComment);

        req.flash('success-message', 'Your comment was submitted successfully!')
        res.redirect(`/post/${req.params.id}`)

      } else {
        throw createError.Forbidden('You must be logged in to submit a comment')
      }
    } catch (error) {
        req.flash('error-message', error.message)
        res.redirect(`/post/${req.params.id}`)
      
    }

  }

};
