const User = require('../models/user');
const Patient = require('../models/patient');
const Slot = require('../models/slot');
const appointment_mailer = require('../mailers/appointment-mailer');

// Appointment Page Rendering
module.exports.appointment = function (req, res) {
    return res.render('appointment', {
        title: "Appointment | MediAssist",
        date: null,
        available: false
    });
}

// Check Availability of Appointment
module.exports.check_availability = async function (req, res) {
    try {
        let date = req.body.date;
        let slots = await Slot.find({ date: date });
        console.log('Entered in slots section: ', slots);

        if (slots.length == 0) {
            // slots = await Slot.create({
            //     date: date,
            //     is_booked: false
            // });
            console.log('Entered in slots creation section');
            const startTime = new Date(`${date}T09:00:00`);
            const endTime = new Date(`${date}T17:00:00`); // Assuming slots up to 5:00 PM

            const slotDuration = 60 * 60 * 1000; // 1 hour in milliseconds
            const numberOfSlots = 8;

            // Create an array to hold the slots
            const newSlots = [];

            for (let i = 0; i < numberOfSlots; i++) {
                const slotStartTime = new Date(startTime.getTime() + i * slotDuration);
                const slotEndTime = new Date(slotStartTime.getTime() + slotDuration);

                let new_slot_dummy = await Slot.create({
                    date: date,
                    start_time: slotStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    end_time: slotEndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    is_booked: false,
                });

                newSlots.push(new_slot_dummy);
                // console.log(new_slot_dummy);
            }

            // Insert the new slots into the database
            // await Slot.insertMany(newSlots);

            // Update the 'slots' variable with the newly created slots
            slots = newSlots;
        } else {
            slots = await Slot.find({ date: date, is_booked: false });
        }

        return res.render('appointment', {
            title: 'Appointment | MediAssist',
            slots: slots,
            date: date,
            available: true
        });
    } catch (err) {
        console.log('Error: ', err);
        return res.redirect('back');
    }
}

// Book Appointment
module.exports.book_appointment = async function (req, res) {
    try {

        let slot = await Slot.findById(req.body.slot);
        console.log('Slot: ', slot);
        slot.patient = req.user._id;
        slot.is_booked = true;
        slot.save();

        let patient = await Patient.findOne({ user: req.user._id });
        patient.appointments.push(slot._id);
        patient.save();

        appointment_mailer.appointment(patient);

        req.flash('success', 'Appointment booked successfully!');
        return res.render('appointment_display', {
            title: "Appointment | MediAssist",
            slot: slot,
            patient: patient
        });

    } catch (error) {
        console.log('Error: ', error);
        return res.redirect('back');
    }
}

// View Appointments
module.exports.view_appointments = async function (req, res) {

    let patient = await Patient.findOne({ user: req.user._id }).populate({
        path: 'appointments',
        populate: {
            path: 'patient'
        }
    }).exec();

    return res.render('view_appointment', {
        title: "Appointments | MediAssist",
        patient: patient
    });
}