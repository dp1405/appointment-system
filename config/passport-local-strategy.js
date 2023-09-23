const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

const Practitioner = require('../models/practitioner');

passport.use(new LocalStrategy({
    usernameField: 'email_username',
    passReqToCallback: true
}, function(req, email_username, password, done) {
    User.findOne({ $or: [{ email: email_username }, { username: email_username }] }, function(err, user) {
        if (err) {
            console.log('Error encountered while finding the user:', err);
            return done(err);
        }

        if (!user) {
            return checkPractitioner(email_username, password, req, done);
        }

        if (user.password!=password) { // Assuming you have a validPassword method
            console.log('Invalid Email/Username or Password');
            req.flash('error', 'Invalid Email/Username or Password');
            return done(null, false);
        }
        // console.log('User is a patient');
        return done(null, user);
    });
}));

function checkPractitioner(email_username, password, req, done) {
    Practitioner.findOne({ $or: [{ email: email_username }, { username: email_username }] }, function(err, user) {
        if (err) {
            console.log('Error encountered while finding the practitioner:', err);
            return done(err);
        }

        if (!user) {
            console.log('Invalid Email/Username or Password');
            req.flash('error', 'Invalid Email/Username or Password');
            return done(null, false);
        }

        if (user.password!=password) { // Assuming you have a validPassword method
            console.log('Invalid Email/Username or Password');
            req.flash('error', 'Invalid Email/Username or Password');
            return done(null, false);
        }
        // console.log('User is a practitioner');
        return done(null, user);
    });
}

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err) {
            console.log('Error in finding the user through id obtained by deserializing');
            return done(err);
        }
        return done(null, user);
    });
});

// verifying if the user is authentic
passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        // if the user is authenticated then proceed him from the sign in page
        return next();
    }
    // if the user is not authenticated then send him back to the sign in page
    return res.redirect('/users/sign-in');
}

// check if the user is a builder
passport.checkPatient = function(req, res, next){
    if(req.isAuthenticated()){
        if(req.user.role == 'builder'){
            return next();
        }
        return res.redirect('back');
    }
    return res.redirect('/users/sign-in');
}

// check if the user is a Practitioner
passport.checkPractitioner = function(req, res, next){
    if(req.isAuthenticated()){
        if(req.user.role == 'practitioner'){
            return next();
        }
        return res.redirect('back');
    }
    return res.redirect('/users/sign-in');
}

// check if user is a builder or a Practitioner
passport.checkPatientPractitioner = function(req, res, next){
    if(req.isAuthenticated()){
        if(req.user.role == 'practitioner' || req.user.role == 'patient'){
            return next();
        }
        return res.redirect('back');
    }
    return res.redirect('/users/sign-in');
}

// using authentication as middleware 
passport.setAuthenticatedUser = function(req, res, next){
    // console.log(req.user);
    if(req.isAuthenticated()){
        // if the user is authenticated then req already contains the data of the user which we will further send to the 
        // views to make use of it
        if(req.user.role == 'patient'){
            // console.log('User is a patient');
            res.locals.user = req.user;
        } else {
            console.log('User is a practitioner');
            res.locals.user = req.practitioner;
        }
    }
    next();
}

module.exports = passport;