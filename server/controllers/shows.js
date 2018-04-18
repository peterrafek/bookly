const models = require('../models');
const Op = require('sequelize').Op;

module.exports = {
    async getHome(req, res) {
        // Get shows
        const shows = await models.Show.findAll({
            where: {
                [Op.or]: [{provider: 'Netflix'},
                {provider: 'HBO'},
                {provider: 'Hulu'}],
            },
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
};
