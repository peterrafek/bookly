const user = require('./user');
const shows = require('./shows');
const userController = require('../controllers/user');

module.exports = (app, passport) => {
    app.get('/', (req, res) => res.redirect('/shows'));
    app.get('/login', userController.getLogin);
    app.get('/logout', userController.logout);
    // Facebook authentication
    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook',
        {successRedirect: '/shows', failureRedirect: '/login'}));
    app.use('/user', user);
    app.use('/shows', shows);
};
