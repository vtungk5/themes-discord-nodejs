const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Table = new Schema({    
    fullname: {
        type: String,
    },
    username: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    DateBirth: {
        type: Number,
    },
    MonthBirth: {
        type: Number,
    },
    YearBirth: {
        type: Number,
    },
    password: {
        type: String,
        required: true 
    },
    token: {
        type: String,
    },
    FullInfo: {
        type: String,
    },
});

module.exports = mongoose.model('users', Table);