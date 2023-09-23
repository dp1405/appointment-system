const mongoose = require('mongoose');

const practitionerScehma = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
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
    gender: {
        type: String
    },
    contact: {
        type: String
    },
    address: {
        type: String
    },
    experience: {
        type: Number
    },
    qualification: {
        type: String
    },
    specialization: {
        type: String
    },
    opening_time: {
        type: Date
    },
    closing_time: {
        type: Date
    },
    fees: {
        type: Number
    },
},{
    timestamps: true
});

const Practitioner = mongoose.model('Practitioner', practitionerScehma);

module.exports = Practitioner;