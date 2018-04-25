const express = require('express');
const router = new express.Router();

const userController = require('../controllers/user');

// Profile details
router.get('/profile',
    userController.ensureAuthenticated,
    userController.getProfile);
router.get('/favorites',
    userController.ensureAuthenticated,
    userController.getFavorites);
module.exports = router;
