require('dotenv').config();

const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const app = express();

app.use(cors());
routes(app);

if (process.env.NODE_ENV === 'development') {
    app.listen(process.env.PORT, () => {
        console.log(`🚀 Server ready at http://${process.env.HOST || 'localhost'}:${process.env.PORT}`);
    });
}