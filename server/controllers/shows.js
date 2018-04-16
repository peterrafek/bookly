const models = require('../models');
const Op = require('sequelize').Op;

module.exports = {
    async getHome(req, res) {
        // Get shows
        const shows = await models.Show.findAll({
            where: {
                [Op.or]: [{provider: 'Netflix'},{provider: 'HBO'}]
            },
        });
        res.status(200).render('home', {shows});
    },
    async search(req, res) {
        var search_string = req.body.search_string;
        if (!search_string) {
            console.log("No search string");
            return res.status(400).send({message: 'No search string provided.'});
        }
        const shows = await models.Show.findAll({
            where: {
                title: {
                    [Op.iLike]: "%" + search_string + "%",
                },
            },
        });
        console.log(shows);
        res.status(200).render('home', {shows});
    }
};

