const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favorites.controller');
const verifyToken = require('../middleware/authMiddleware');


router.post('/', favoriteController.addFavorite);
router.get('/:userId', favoriteController.getFavoritesByUser);
router.delete('/:userId/:videoId', favoriteController.removeFavorite);

module.exports = router;
