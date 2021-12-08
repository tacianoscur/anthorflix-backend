require('dotenv').config();

const express = require('express');

const { User, Comment } = require('../models');

module.exports = {
    async createComment(req, res, next) {
        const { description, userId, ratingId } = req.body;

        try {
            const newComment = await Comment.create({
                description,
                user: userId,
                rating: ratingId,
            });

            const user = await User.findOne({ _id: userId });

            newComment.user = user;

            res.send(newComment);
        }
        catch(err) {
            res.status(400).send({ error: 'Error while creating a comment.' });
        }
    },

    async getOneComment(req, res, next) {
        const { commentId } = req.params;

        try {
            const comment = await Comment.findOne({ _id: commentId });

            res.send(comment);
        }
        catch(err) {
            res.status(400).send({ error: 'Error while listing comment.' });
        }
    },

    //########### Possibilidade de atualizar comentários
    /*
    async updateComment(req, res, next) {
        const { description } = req.body;
        const { id } = req.params;

        try {
            const comment = await Comment.findByIdAndUpdate(id, {
                description
            }, { new: true });

            res.send(comment);
        }
        catch(err) {
            res.status(400).send({ error: 'Error while updating comment.' });
        }
    },
    */

    async deleteComment(req, res, next) {
        const { id } = req.params;

        try {
            await Comment.deleteOne({ _id: id });

            res.status(200).send();
        }
        catch(err) {
            res.status(400).send({ error: 'Error while deleting comment.' });
        }
    },
};