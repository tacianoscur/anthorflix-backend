const express = require('express');

const { User } = require('../models');

module.exports = {
    async registerUser(req, res, next) {
        const { name, email, password } = req.body;

        try {
            if (await User.findOne({ email })) {
                res.status(400).send({ error: 'Email is already registered.' });
            }

            const user = await User.create({
                name,
                email,
                password
            });

            user.password = undefined;

            res.send(user);
        }
        catch(err) {
            res.status(400).send({ error: 'Error while creating user.' });
        }
    },

    async getUsers(req, res, next) {
        try {
            const users = await User.find();

            res.send(users);
        }
        catch(err) {
            res.status(400).send({ error: 'Error while listing users.' });
        }
    },
};