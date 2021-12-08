require('dotenv').config();

const express = require('express');

const { Rating, Comment } = require('../models');

module.exports = {
    async createRating(req, res, next) {
        const { rating, userId, movieId } = req.body;

        try {
            const newRating = await Rating.create({
                rating,
                user: userId,
                movie: movieId,
            });

            res.send(newRating);
        }
        catch(err) {
            res.status(400).send({ error: 'Error while rating a movie.' });
        }
    },

    async getRatingComments(req, res, next) {
        const { id } = req.params;

        try {
            const comments = await Comment.find({ rating: id }).populate('user');

            res.send(comments);
        }
        catch(err) {
            res.status(400).send({ error: 'Error while listing comments.' });
        }
    },

    async updateRating(req, res, next) {
        const { rating } = req.body;
        const { id } = req.params;

        try {
            const ratingUpdated = await Rating.findByIdAndUpdate(id, {
                rating
            }, { new: true });

            res.send(ratingUpdated);
        }
        catch(err) {
            res.status(400).send({ error: 'Error while updating rating.' });
        }
    },

    async deleteOneMovie(req, res, next) {
        const { id } = req.params;

        try {
            await Rating.deleteOne({ _id: id });

            res.status(200).send();
        }
        catch(err) {
            res.status(400).send({ error: 'Error while deleting movie.' });
        }
    },
};