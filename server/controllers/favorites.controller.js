const FavoriteVideo = require('../models/favorites.model');

exports.addFavorite = async (req, res) => {
    const { userId, videoId, title, thumbnail } = req.body;

    if (!userId || !videoId || !title || !thumbnail) {
        return res.status(400).json({ message: 'Faltan campos requeridos.' });
    }

    try {
        const exists = await FavoriteVideo.findOne({ userId, videoId });
        if (exists) {
            return res.status(409).json({ message: 'Este video ya está en tus favoritos.' });
        }
        const newFavorite = new FavoriteVideo({ userId, videoId, title, thumbnail });


        await newFavorite.save();

        res.status(201).json(newFavorite);
    } catch (error) {
        console.error('Error al guardar el favorito:', error);
        res.status(500).json({ message: 'Error interno del servidor.', error });
    }
};

exports.getFavoritesByUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        const favorites = await FavoriteVideo.find({ userId });
        res.status(200).json(favorites);
    } catch (error) {
        console.error('Error al obtener favoritos:', error);
        res.status(500).json({ message: 'Error al obtener favoritos.' });
    }
};

exports.removeFavorite = async (req, res) => {
    const { userId, videoId } = req.params;

    try {
        await FavoriteVideo.deleteOne({ userId, videoId });
        res.status(200).json({ message: 'Video eliminado de favoritos.' });
    } catch (error) {
        console.error('Error al eliminar favorito:', error);
        res.status(500).json({ message: 'Error al eliminar el favorito.' });
    }
};
