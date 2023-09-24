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
    slot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Slot'
    }
},{
    timestamps: true
});

const User = mongoose.model('User', userScehma);

module.exports = User;