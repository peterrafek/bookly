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
    getSignup(req, res) {
        if (req.isAuthenticated()) {
            res.redirect('/shows/');
        } else {
            res.status(200).render('signup');
        }
    },
    logout(req, res) {
        if (req.isAuthenticated()) {
            req.logout();
        }
        res.status(200).redirect('/login');
    },
    async getFavorites(req, res) {
        const favorites = await models.Favorite.findAll({
            where: {
                user_id: req.user.id,
            },
            include: [{
                model: models.Show,
                as: 'show',
                attributes: {
                    exclude: ['id', 'picture_link', 'createdAt', 'updatedAt'],
                },
            }],
        });
        res.render('favorites', {favorites});
    },
};
