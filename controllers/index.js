var express = require('express');
var router  = express.Router();

function authenticationMiddleware(req, res, next) {
  // prevent back button on revealing stuff
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');

  // if no user logged in or someone logged out go to first page
  if ((typeof req.session.user === 'undefined') || req.session.user === null ) {
  	// if auth fails go to singup
  	res.render('index');
  }
    return next();
}

router.get('/', authenticationMiddleware, function(req, res) {
	res.redirect('/logged');
})
module.exports = router;