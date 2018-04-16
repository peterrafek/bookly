const models = require('../models');
// const sequelize = require('sequelize');
// const Op = sequelize.Op;

module.exports = {
    ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/login');
        }
    },
    async getProfile(req, res) {
        const user = await models.User.findOne({where: {id: req.user.id}});
        console.log(user);
        res.status(200).render('profile', {user});
    },
    getLogin(req, res) {
        if (req.isAuthenticated()) {
            res.redirect('/shows/');
        } else {
            res.status(200).render('login');
        }
    },
};
