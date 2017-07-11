'use strict';

const Article = require('../model/article');
const createError = require('http-errors');

module.exports = exports = {};

exports.postArticle = function(req) {
  return new Article(req.body)
    .save()
    .then(article => article)
    .catch(err => Promise.reject(createError(400), err.message));
};

exports.getArticle = function(req) {
  return Article.findById(req.params.articleId)
    .then(article => article)
    .catch(err => Promise.reject(err.message));
};
exports.getAllArticles = function(req) {
  console.log(req);
  return Article.find()
    .then(articles => {
      console.log(articles);
      return articles;
    })
    .catch(err => Promise.reject(err.message));
};
