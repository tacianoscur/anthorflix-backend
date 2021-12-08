const express = require('express');
const users = require('./users');
const movies = require('./movies');
const ratings = require('./ratings');
const comments = require('./comments');

module.exports = app => {
    app.use(express.json());
    app.use(users);
    app.use(movies);
    app.use(ratings);
    app.use(comments);
};