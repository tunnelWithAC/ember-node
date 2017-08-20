var mongoose = require('mongoose');

module.exports = mongoose.model('note', {
    title: 'string',
    content: 'string',
    author: 'string'
});
