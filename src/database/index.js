require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0pwqz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`);
mongoose.Promise = global.Promise;

module.exports = mongoose;