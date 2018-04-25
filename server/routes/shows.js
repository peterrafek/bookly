const express = require('express');
const router = new express.Router();

const showsController = require('../controllers/shows');
const userController = require('../controllers/user');

// Shows home
router.get('/',
    userController.ensureAuthenticated,
    showsController.getHome);
router.post('/search', userController.ensureAuthenticated,
    showsController.search);
router.put('/record', userController.ensureAuthenticated,
    showsController.recordFavorite);
module.exports = router;
