const models = require('../models');

module.exports = (passport, user) => {
    FacebookStrategy = require('passport-facebook').Strategy;
    const auth = require('./auth');

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
          models.User.findById(id).then( (user) => {
              if (user) {
                  done(null, user.get());
              } else {
                  done(user.errors, user);
              }
          });
    });
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: auth.facebook.FIELDS,
        },
        (accessToken, refreshToken, profile, done) => {
            models.User.findOrCreate({
                where: {
                    facebook_id: profile.id,
                },
                defaults: {
                    facebook_id: profile.id,
                    name: profile.name.givenName + ' ' + profile.name.familyName,
                },
            }).spread((user, created) => {
                if (!user) {
                    console.log('No user created.');
                    return done();
                }
                if (created) {
                    return done(null, user);
                } else {
                    // TODO: Update user info
                    return done(null, user);
                }
            });
        }
    ));
};
