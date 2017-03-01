var express = require('express')
var app = express()
var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var ensureAuthenticated = require('../config/authentication-check').ensureAuthenticated
var authConfig = require('../config/auth')
var Users = require('../models/user-model')

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy(
  authConfig.google,

  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

app.get('/login', function(req, res) {
  if (req.session.userId) {
      res.redirect('/')
  }
  
  res.render('login', {
    user: req.user
  });
});


app.get('/auth/google',
  passport.authenticate('google', { scope: ['openid email profile'] }
  ));


app.get('/oauthcallback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  function(req, res) {
      console.log(req)
    // Authenticated successfully
    // lets put this into Mongo

    req.session.userId = req.user.id
    console.log("session user stored as: " , req.session.userId)

var newUser = {
    account: {
        id: req.user.id,
        email: req.user.emails[0].value,
        name: req.user.displayName,
        photo: req.user.photos[0].value 
    }
}


Users.create(newUser)
        .then(usr => {
            console.log({
                message: "created successfully",
                data: usr
            })
        })
        .catch(error => {
            console.log({
                error: error
            })
        })



    res.redirect('/');
  });

app.get('/account', ensureAuthenticated, function(req, res) {
  res.render('account', {
    user: req.user
  });
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});






module.exports = app
