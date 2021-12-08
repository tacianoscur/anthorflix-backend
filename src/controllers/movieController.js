require('dotenv').config();

const express = require('express');

const { Movie, Rating, Genre} = require('../models');
const { moviesApi } = require('../services');

module.exports = {
    async createMovie(req, res, next) {
        const { id } = req.body;

        try {
            const { data: movie } = await moviesApi.get(`movie/${id}`);
            let genres;

            if (movie.genres) {
                genres = await Promise.all(movie.genres.map(async genre => {
                    const genreExists = await Genre.findOne({ name: genre.name });
                    
                    if (genreExists) {
                        return genreExists._id;
                    }

                    const newGenre = await Genre.create({ name: genre.name });
                    return newGenre._id;
                }));
            }

            const newMovie = await Movie.create({
                title: movie.original_title,
                overview: movie.overview,
                poster: movie.poster_path,
                releaseDate: movie.release_date,
                language: movie.original_language,
                genres: genres,
            });

            res.send(newMovie);
        }
        catch(err) {
            console.log(err);
            res.status(400).send({ error: 'Error while creating movie.' });
        }
    },

    async getMovies(req, res, next) {
        try {
            const movies = await Movie.find().populate('genres');

            res.send(movies);
        }
        catch(err) {
            console.log(err);
            res.status(400).send({ error: 'Error while listing movies.' });
        }
    },

    async getMovieRatings(req, res, next) {
        const { id } = req.params;

        try {
            const ratings = await Rating.find({ movie: id }).populate('user');

            res.send(ratings);
        }
        catch(err) {
            res.status(400).send({ error: 'Error while listing ratings.' });
        }
    },

    async getMovieRatingAverage(req, res, next) {
        const { id } = req.params;

        try {
            const movie = await Movie.findOne({ _id: id });
            
            const average = await Rating.aggregate([
                { $match: { movie: movie._id } },
                { $group: { _id: null, average: { $avg: '$rating' } } },
            ]);

            res.send(average);
        }
        catch(err) {
            res.status(400).send({ error: 'Error while listing ratings.' });
        }
    },

    async getOneMovie(req, res, next) {
        const { id } = req.params;

        try {
            const movie = await Movie.findOne({ _id: id });

            res.send(movie);
        }
        catch(err) {
            res.status(400).send({ error: 'Error while listing movie.' });
        }
    },

    async updateMovie(req, res, next) {
        const { title, overview, poster, releaseDate, genres, language } = req.body;
        const { id } = req.params;

        try {
            const movie = await Movie.findByIdAndUpdate(id, {
                title,
                overview,
                poster,
                releaseDate,
                genres,
                language,
            }, { new: true });

            res.send(movie);
        }
        catch(err) {
            res.status(400).send({ error: 'Error while updating movie.' });
        }
    },

    async deleteMovie(req, res, next) {
        const { id } = req.params;

        try {
            await Movie.deleteOne({ _id: id });

            res.status(200).send();
        }
        catch(err) {
            res.status(400).send({ error: 'Error while deleting movie.' });
        }
    },
};