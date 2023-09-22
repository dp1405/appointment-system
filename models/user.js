const mongoose = require('mongoose');

const userScehma = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        require: true
    },
    contact: {
        type: String
    },
    address: {
        type: String
    },
    weight: {
        type: Number
    },
    height: {
        type: Number
    },
    birth_date: {
        type: Date
    },
    history: {
        type: String
    },

},{
    timestamps: true
});

const User = mongoose.model('User', userScehma);

module.exports = User;