var mongoose = require('mongoose');

module.exports = mongoose.model('post', {
    title: 'string',
    text: 'string',
    user: 'string',
    visible: {type: 'boolean', default: true},
    votes: { type: 'number', default: 0 },
    totalVotes: 'string',
    date: { type: 'date', default: Date.now }
});
