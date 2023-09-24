const mongoose = require('mongoose');

const patientScehma = new mongoose.Schema({
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
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Slot'
    }]

},{
    timestamps: true
});

const Patient = mongoose.model('Patient', patientScehma);

module.exports = Patient;