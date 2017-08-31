var mongoose = require('mongoose');

module.exports = mongoose.model('user', {
    user: 'string',
    email: 'string',
    password: 'string'
});
