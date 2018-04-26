const models = require('../models');
const Op = require('sequelize').Op;

module.exports = {
    async getHome(req, res) {
        // Get 30 random shows
        const numShows = 255;
        let ids = [];
        for (let i = 0; i < 30; i++) {
            // generate random number
            const id = Math.floor(Math.random() * numShows);
            // add to array if it isn't in there already
            if (!ids.includes(id)) {
                ids.push(id);
            }
        }
        const shows_arr = await models.Show.findAll({
            where: {
                id: {
                    [Op.or]: ids,
                },
            },
            order: [
                ['title', 'ASC'],
            ],
            include: [{
                model: models.Favorite,
                as: 'favorites',
                attributes: ['id', 'user_id'],
            }],
        });
        let shows = [];
        shows_arr.forEach((show) => {
            let isFavorite = false;
            let favoriteID = null;
            show.favorites.forEach((favorite) => {
                if (favorite.dataValues.user_id === req.user.id) {
                    isFavorite = true;
                    favoriteID = favorite.dataValues.id;
                }
            });
            const show_node = {
                metadata: show,
                is_favorite: isFavorite,
                favorite_id: favoriteID,
            };
            shows.push({show_node});
        });
        res.status(200).render('home', {shows});
        //res.status(200).json({'shows': shows});
    },
    async search(req, res) {
        const searchString = req.body.search_string;
        if (!searchString) {
            console.log('No search string');
            req.flash('error', 'No search string provided.');
            return res.redirect('/shows');
        }
        const shows_arr = await models.Show.findAll({
            where: {
                title: {
                    [Op.iLike]: '%' + searchString +'%',
                },
            },
            order: [
                ['title', 'ASC'],
            ],
            include: [{
                model: models.Favorite,
                as: 'favorites',
                attributes: ['id', 'user_id'],
            }],
        });
        let shows = [];
        shows_arr.forEach((show) => {
            let isFavorite = false;
            let favoriteID = null;
            show.favorites.forEach((favorite) => {
                if (favorite.dataValues.user_id === req.user.id) {
                    isFavorite = true;
                    favoriteID = favorite.dataValues.id;
                }
            });
            const show_node = {
                metadata: show,
                is_favorite: isFavorite,
                favorite_id: favoriteID,
            };
            shows.push({show_node});
        });
        res.status(200).render('home', {shows});
    },
    async recordFavorite(req, res) {
        const showId = req.body.show_id;
        await models.Favorite.create({
            user_id: req.user.id,
            show_id: showId,
        });
        res.redirect('/user/favorites');
    },
    async deleteFavorite(req, res) {
        const favoriteId = req.body.id;
        const favorite = await models.Favorite.findOne({
            where: {
                id: favoriteId,
            },
        });
        if (favorite) {
            favorite.destroy();
            req.flash('success', 'Removed favorite.');
            res.redirect('/user/favorites');
            return;
        }
        req.flash('error', 'Could not remove favorite.');
        res.redirect('/user/favorites');
    },
};
