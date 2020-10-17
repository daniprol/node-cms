module.exports = {
  globalVariables: (req, res, next) => {
    res.locals.success_message = req.flash("success-message");
    res.locals.error_message = req.flash("error-message");
    // console.log(res.locals);

    return next();
  },
};
