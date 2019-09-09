var authController = require('../controllers/authcontroller.js');

module.exports = function(app) {
    app.get('/signup', authController.signup);


app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup'
}
));
}