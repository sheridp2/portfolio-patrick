'use strict';

const bearerAuth = require('../lib/bearer-auth-middleware');
const articleController = require('../controller/article-controller');

module.exports = function(router) {
  router.post('/article', bearerAuth, (req, res) => {
    articleController
      .postArticle(req)
      .then(article => res.status(201).json(article))
      .catch(err => res.status(err));
  });

  router.get('/article/:articleId', bearerAuth, (req, res) => {
    return articleController
      .getArticle(req)
      .then(article => {
        res.status(200).json(article);
      })
      .catch(err => res.status(err.status).send(err.message));
  });

  router.get('/articles', (req, res) => {
    return articleController
      .getAllArticles(req)
      .then(articles => {
        console.log(articles);
        res.status(200).json(articles);
      })
      .catch(err => res.status(err.status).send(err.message));
  });
  return router;
};
