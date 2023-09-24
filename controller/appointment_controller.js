const User = require('../models/user');
// const contact_mailer = require('../mailers/contact');

module.exports.appointment = function(req, res){
    return res.render('appointment', {
        title: "Appointment | MediAssist"
    });
}
