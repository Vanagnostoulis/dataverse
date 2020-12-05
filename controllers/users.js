var express = require('express'),
    router  = express.Router(),
    login   = require('../models/users/login.js'),
    logout  = require('../models/users/logout.js'),
    signup  = require('../models/users/signup.js');

router.get('/login', function(req, res) {
    res.render('login');
});

router.get('/logged', function(req, res) {
    res.render('');
});

router.post('/logout', function(req, res) {
  logout.logoutUser(req, res, function(err, data) {
    if (err) {
      res.json({ 'error': data.error, 'message': data.message });
    } else {
      res.json({ 'success': data.success, 'message': data.message });
    }
  });
});

router.post('/signup', function(req, res) {
  signup.addUser(req, res, function(err, data) {
    if (err) {
      res.json({ 'error': true, 'message': 'Error adding user .. !' });
    } else {
      res.json({ 'success': true, 'message': 'User added succesfully' });
    }
  });
});

router.post('/login', function(req, res) {
  login.loginUser(req, res, function(err, data) {
    if (err) {
      res.json({ 'error': true, 'message': 'Error logged in' });
    } else {
      res.json({ 'success': true, 'data': data });
    }
  });
});

module.exports = router;
