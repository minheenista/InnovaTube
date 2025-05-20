const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const favoriteSchema = Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    videoId: { type: String, required: true },
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
