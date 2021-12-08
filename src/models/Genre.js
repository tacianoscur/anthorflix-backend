const mongoose = require('../database');

const GenreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

const Genre = mongoose.model('Genre', GenreSchema);

module.exports = Genre;