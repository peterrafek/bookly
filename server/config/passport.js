const models = require('../models');
LocalStrategy = require('passport-local').Strategy;

module.exports = (passport, user) => {
    passport.use('login', new LocalStrategy(
        async (email, password, done) => {
            const user = await models.User.findOne({
                where: {
                    email: email,
                },
            });
            if (!user) {
                return done(null, false, {message: 'Account not found.'});
            }
            if (!(await user.verifyPassword(password))) {
                return done(null, false, {message: 'Incorrect password.'});
            }
            return done(null, user);
        }
    ));

    passport.use('signup', new LocalStrategy({
        passReqToCallback: true},
        async (req, email, password, done) => {
            // TODO: Check if password is valid
            const user = await models.User.findOne({
                where: {
                    email: email,
                },
            });
            if (user) {
                return done(null, false, {message:
                    'Account already existswith email address ' +
                    '\'' + email + '\'.'});
            }
            const hash = await models.User.generateHash(password);
            const info = {
                name: req.body.name,
                email: email,
                password: hash,
            };
            const newUser = await models.User.create(info);
            if (!newUser) {
                return done(null, false, {message: 'Database error'});
            }
            return done(null, newUser);
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        models.User.findById(id).then((user) => {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, user);
            }
        });
    });
};
