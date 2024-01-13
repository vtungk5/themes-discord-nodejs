const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Table = new Schema({    
    BoxID: {
        type: String,
    },
    username: {
        type: String,
    },
    reply: {
        type: String,
    },
    message: {
        type: String,
    },
    files: {
        type: String,
    },
    date: {
        type: date,
    }
});

module.exports = mongoose.model('group', Table);