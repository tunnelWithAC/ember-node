var mongoose = require('mongoose');
var userModel = require('./user');
var postModel = require('./post');

module.exports = mongoose.model('uservote', {
  user: 'string',
  post: 'string',
  value: 'number'
    });
