'use strict';

const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  title: { type: String, require: true },
  article: { type: String, require: true },
  created: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
});

module.exports = mongoose.article('article', articleSchema);
