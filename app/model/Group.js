const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Table = new Schema({    
    name: {
        type: String,
    },
    createby: {
        type: String,
    }
});

module.exports = mongoose.model('group', Table);