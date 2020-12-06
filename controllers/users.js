var express = require('express'),
    router  = express.Router(),
    login   = require('../models/users/login.js'),
    logout  = require('../models/users/logout.js'),
    signup  = require('../models/users/signup.js');

router.get('/login', function(req, res) {
  // prevent back button on revealing stuff
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');// if no user logged in or someone logged out go to first page
  res.render('login', { error: req.session.error });
  delete res.session.error;
});

router.get('/signup', function(req, res) {
  // prevent back button on revealing stuff
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');// if no user logged in or someone logged out go to first page
  res.render('signup');
});

router.get('/logged', function(req, res) {
  // prevent back button on revealing stuff
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');// if no user logged in or someone logged out go to first page
  login.getCredentials(req, res, function(err, data) {
    if (err) {
      res.redirect('/login');
    } else {
      res.render('user', { title: 'User List', userData: data});
    }
  });
});

router.post('/logout', function(req, res) {
  logout.logoutUser(req, res, function(err, data) {
    if (err) {
      console.log("error logging out");
      res.redirect('/');
    } else {
      res.redirect('/');
    }
  });
});

router.post('/signup', function(req, res) {
  signup.addUser(req, res, function(err, data) {
    if (err) {
      res.redirect(400,'/');
    } else {
      res.redirect('/login');
    }
  });
});

router.post('/login', function(req, res) {
  login.loginUser(req, res, function(err, data) {
    if (err) {
      req.session.error = 'Incorrect username or password';
      res.redirect('/login');
    } else {
      res.redirect('/logged');
    }
  });
});

module.exports = router;
