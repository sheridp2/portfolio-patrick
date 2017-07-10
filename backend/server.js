'use strict';

require('dotenv').load();

const express = require('express');
const cors = require('cors');
const Promise = require('bluebird');
const bodyParser = require('body-parser').json();
const errorHandler = require('./lib/error-middleware');
const mongoose = require('mongoose');

const app = (module.exports = express());
const router = express.Router();
const authRouter = require('./route/auth-route')(router);
const articleRouter = require('./route/article-route')(router);

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/patblog';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(errorHandler);
app.use(cors());
app.use(bodyParser);

app.use('./api', authRoutes);
app.use('./api', articleRoutes);

app.listen(process.env > PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
