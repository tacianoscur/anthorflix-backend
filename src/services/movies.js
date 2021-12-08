require('dotenv').config();

const axios = require('axios');

const api = axios.create({
  baseURL: process.env.TMDB_API_URL,
  params: {
    api_key: process.env.TMDB_API_KEY
  },
});

module.exports = api;