const express = require('express');
const router = express.Router();
const passport = require('passport');

//accessing the controller folder
const appointmentController = require('../controller/appointment_controller');

router.get('/', passport.checkPatientPractitioner, appointmentController.appointment); //redirected to controller rendering appointment page

module.exports = router;