var mongoose = require('mongoose');

module.exports = mongoose.model('comment', {
    post: 'string',
    content: 'string',
    user: 'string',
    visible: {type: 'boolean', default: true},
    votes: { type: 'number', default: 0 },
    date: { type: 'date', default: Date.now }
});
