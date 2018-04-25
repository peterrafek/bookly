const user = require('./user');
const shows = require('./shows');
const userController = require('../controllers/user');

module.exports = (app, passport) => {
    app.get('/', (req, res) => res.redirect('/shows'));
    app.get('/login', userController.getLogin);
    app.get('/signup', userController.getSignup);
    app.get('/logout', userController.logout);
    app.get('/privacy', (req, res) => {
        res.render('privacy');
    });
    app.post('/login', passport.authenticate('login',
        {successRedirect: '/shows', failureRedirect: '/login',
        failureFlash: true})
    );
    app.post('/signup', passport.authenticate('signup',
        {successRedirect: '/shows', failureRedirect: '/signup',
        failureFlash: true})
    );
    app.use('/user', user);
    app.use('/shows', shows);
};
