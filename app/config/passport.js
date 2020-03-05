let express = require('express');
let app = express();
let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;

let db = require("../models"); 
passport.use(new LocalStrategy(function (username, password, done) {

  User.findOne({ username: username }, function (err, user) {

    if (err) { return done(err); }

    if (!user) {
      usr = new User({  }); //need to make this a form
      usr.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('user: ' + usr.username + " saved.");
        }
      });

    }

    user.comparePassword(password, function (err, isMatch) {
      if (err) return done(err);
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid password' });
      }
    });
  });
}));
// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email"
  },
  function (email, password, done) {
    // When a user tries to sign in this code runs
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function (dbUser) {
      // If there's no user with the given email
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      return done(null, dbUser);
    });
  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});
//route for logging in 
app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/watchlist.html',
    failureRedirect: '/login',
    failureFlash: true
  })
);
//log out route
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// Exporting our configured passport
module.exports = passport;