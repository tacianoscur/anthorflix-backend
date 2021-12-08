const express = require('express');
const User = require('./user');
const Movie = require('./Movie');
const Rating = require('./Rating');
const Genre = require('./Genre');
const Comment = require('./Comment');

module.exports = {
    User,
    Movie,
    Rating,
    Genre,
    Comment,
};