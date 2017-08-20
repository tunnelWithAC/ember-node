var mongoose = require('mongoose');

module.exports = mongoose.model('post', {
    title: 'string',
    content: 'string',
    author: 'string'
});
