'use strict';

const basicAuth = require('../lib/basic-auth-middleware');
const authCtrl = require('../controller/auth-controller');

module.exports = function(router) {
  router.post('/user', (req, res) => {
    authCtrl
      .createUser(req)
      .then(token => res.status(201).send(token))
      .catch(err => res.status(400).send(err.message));
  });

  router.get('/user', basicAuth, (req, res) => {
    authCtrl
      .fetchUser(req)
      .then(token => res.status(200).send(token))
      .catch(err => res.status(res.status).send(err.message));
  });
  return router;
};
