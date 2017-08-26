var mongoose = require('mongoose');

module.exports = mongoose.model('post', {
    title: 'string',
    content: 'string',
    author: 'string',
    votes: { type: 'number', default: 10 },
    date: { type: 'date', default: Date.now }
});
