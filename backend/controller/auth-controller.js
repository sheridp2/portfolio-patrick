'use strict';

const Promise = require('bluebird');
const User = require('../model/user');
const createError = require('http-errors');

module.exports = exports = {};

exports.createUser = function(req) {
  let tempPassword = req.body.password;
  req.body.password = null;
  delete req.body.password;

  let newUser = new User(req.body);

  return newUser
    .generatePasswordHash(tempPassword)
    .then(user => user.save())
    .then(user => user.generateToken())
    .then(token => token)
    .catch(err => Promise.reject(createError(400, err.name)));
};

exports.fetchUser = function(req) {
  return User.findOne({ username: req.auth.username })
    .then(user => {
      if (!user) Promise.reject(createError(401, 'Unauthorized'));
      return user
        .comparePasswordHash(req.auth.password)
        .then(user => user.generateToken());
    })
    .catch(err => Promise.reject(createError(401, err.message)));
};
