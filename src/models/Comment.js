const mongoose = require('../database');

const CommentSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rating: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rating',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;