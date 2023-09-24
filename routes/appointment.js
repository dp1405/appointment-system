const express = require('express');
const router = express.Router();
const passport = require('passport');

//accessing the controller folder
const appointmentController = require('../controller/appointment_controller');

router.get('/', passport.checkPatient, appointmentController.appointment); //redirected to controller rendering appointment page
router.post('/check-availability', passport.checkPatient, appointmentController.check_availability); //redirected to controller checking availability of appointment
router.post('/book-appointment', passport.checkPatient, appointmentController.book_appointment); //redirected to controller booking appointment

module.exports = router;