var express = require('express'),
    router  = express.Router(),
    login   = require('../models/users/login.js'),
    logout  = require('../models/users/logout.js'),
    signup  = require('../models/users/signup.js');
/********************************* GET *******************************/
router.get('/login',authenticationMiddlewarelogin, function(req, res) {
  res.redirect('/logged');
});

router.get('/signup',authenticationMiddlewaresignup, function(req, res) {
  res.redirect('/logged');
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

/********************************* POST *******************************/
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
  req.session.error = null;
  login.loginUser(req, res, function(err, data) {
    if (err) {
      req.session.error = 'Incorrect username or password';
      res.redirect('/login');
    } else {
      res.redirect('/logged');
    }
  });
});

/********************************************************/
/********************* MIDDLEWARES **********************/
//used in the case of opening another window and user is already logged in
function authenticationMiddlewarelogin(req, res, next) {
  // prevent back button on revealing stuff
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  // if no user logged in or someone logged out go to first page
  if ((typeof req.session.user === 'undefined') || req.session.user === null ) {
  if (req.session.error === null)
     res.render('login', { error: null });
   else
     res.render('login', { error: req.session.error });
  }
    return next();
}

function authenticationMiddlewaresignup(req, res, next) {
  // prevent back button on revealing stuff
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
   res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');

  // if no user logged in or someone logged out go to first page
  if ((typeof req.session.user === 'undefined') || req.session.user === null ) {
    // if auth fails go to singup
    res.render('signup');
  }
    return next();
}

module.exports = router;
