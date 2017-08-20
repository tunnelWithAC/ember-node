var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
    user: String,
    text: {
        type: String,
        default: ''
    },
    date: { type: Date, default: Date.now }
});
