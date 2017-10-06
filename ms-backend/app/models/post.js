var mongoose = require('mongoose');

module.exports = mongoose.model('post', {
    title: 'string',
    content: 'string',
    author: 'string',
    visible: {type: 'boolean', default: true},
    votes: { type: 'number', default: 0 },
    date: { type: 'date', default: Date.now }
});
