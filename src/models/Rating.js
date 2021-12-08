const mongoose = require('../database');

const RatingSchema = new mongoose.Schema({
    rating: {
        type: Number,
        enum: [ 1, 2, 3, 4, 5 ],
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Rating = mongoose.model('Rating', RatingSchema);

module.exports = Rating;