module.exports = {
    isAuth : (req, res, next) => {
        console.log('Usuario', req.user);
        // if (req.user) {
        if(req.isAuthenticated()) {
            return next()
        }

        res.redirect('/login')
    },

    isNotAuth : (req, res, next) => {
        if (req.isAuthenticated()) {
            return res.redirect('/')
        }

        return next()
    }
}