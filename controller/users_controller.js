const User = require('../models/user');

// Sign-In Page Rendering
module.exports.sign_in = function(req, res){
    return res.render('sign_in', {
        title: "MediAssist | Sign In"
    });
}

// Sign-Up Page Rendering
module.exports.sign_up = function(req, res){
    return res.render('sign_up', {
        title: "MediAssist | Register"
    });
}

// Create Session for Verified User
module.exports.create_session = function(req, res){
    req.flash('success', 'Logged In Successfully!');
    return res.redirect('/');
}

// Register New User
module.exports.new_user = function(req, res){
    if(req.body.re_password != req.body.password){
        req.flash('error', 'Passwords are not matching');
        return res.redirect('back');
    }
    User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] },
        function(err, user){
            if(err){
                console.log('Error in getting the user while signing up!');
                req.flash('error', err);
                return res.redirect('back');
            }

            if(user){
                console.log('User already exists with the entered Username/Email, go Sign-In');
                req.flash('error', 'User already exists!');
                return res.render('sign-in');
            }
            
            User.create(req.body, function(err, user){
                if(err){
                    console.log('Error in getting the user while signing up!'); 
                    req.flash('error', err);
                    return res.redirect('back');
                }
                
                req.flash('success', 'Account registered successfully!');
                return res.redirect('/');
            });
        });
}

// Profile section for User
module.exports.profile = function(req, res){

    User.findById(req.params.id, function(err, user){
        if(err){
            console.log('Error in finding the user!');
            req.flash('error', err);
            return res.redirect('back');
        }

        return res.render('profile', {
            title: "MediAssist | Profile",
            user: user
        });
    });

}

// Update Profile for User
module.exports.update_profile = async function(req, res){
    if(req.params.id = req.user.id){
        try {
            let user = await User.findById(req.params.id);
            user.name = req.body.name;
            user.email = req.body.email;
            user.username = req.body.username;
            user.weight = req.body.weight;
            user.height = req.body.height;
            user.birth_date = req.body.birth_date;
            user.contact = req.body.contact;
            user.address = req.body.address;
            user.history = req.body.history;
            user.save();
            req.flash('success', 'Profile Updated Successfully!');
        } catch (err) {
            req.flash('error', err);
            console.log('Error: ', err);
        }
    } else {
        return res.status(401).send('Unauthorized User');
    }
}

// Destroy Session for User
module.exports.clear_session = function(req, res){
    req.logout(function(err) {
        if (err) { 
            req.flash('err', 'Error while Logging Out!');
            return res.redirect('back'); 
        }
        req.flash('success', 'Logged Out Successfully!');
        res.redirect('/');
    });
}