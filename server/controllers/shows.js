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
        const shows = await models.Show.findAll({
            where: {
                id: {
                    [Op.or]: ids,
                },
            },
            order: [
                ['title', 'ASC'],
            ],
        });
        res.status(200).render('home', {shows});
    },
    async search(req, res) {
        const searchString = req.body.search_string;
        if (!searchString) {
            console.log('No search string');
            req.flash('error', 'No search string provided.');
            return res.redirect('/shows');
        }
        const shows = await models.Show.findAll({
            where: {
                title: {
                    [Op.iLike]: '%' + searchString +'%',
                },
            },
        });
        console.log(shows);
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
};
