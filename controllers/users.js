var express = require('express'),
    router  = express.Router(),
    login   = require('../models/users/login.js'),
    logout  = require('../models/users/logout.js'),
    signup  = require('../models/users/signup.js');

router.get('/login', function(req, res) {
    res.render('login');
});

router.get('/logged', function(req, res) {
    res.render('user');
});

router.post('/logout', function(req, res) {
  logout.logoutUser(req, res, function(err, data) {
    if (err) {
      console.log("error");
      res.redirect('/');
    } else {
      res.redirect('/login');
    }
  });
});

router.post('/signup', function(req, res) {
  signup.addUser(req, res, function(err, data) {
    if (err) {
      console.log('Error adding user .. !');
      res.redirect(400,'/');
    } else {
      res.redirect('/login');
    }
  });
});

router.post('/login', function(req, res) {
  login.loginUser(req, res, function(err, data) {
    if (err) {
      res.json({ 'error': true, 'message': 'Error logged in' });
    } else {
      res.json({ 'error': true, 'data': data });
      //res.render('user.ejs', { title: 'User Details', userData: data});
    }
  });
});

module.exports = router;
