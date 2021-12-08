const mongoose = require('../database');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    overview: {
        type: String,
        required: true,
    },
    poster: {
        type: String,
    },
    releaseDate: {
        type: Date,
    },
    genres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    }],
    language: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;