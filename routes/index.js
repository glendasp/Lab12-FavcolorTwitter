var express = require('express');
var router = express.Router();
var passport = require('passport');


router.get('/', function(req, res, next) {
  //This will probably be the home page for your application
  //Let's redirect to the signup page.
  res.redirect('/login');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  //Redirecting the homepage to the signup page.
  res.redirect('/signup');
});

//Get signup page
router.get('/signup', function(req, res, next ){
  res.render('signup', {message: req.flash('signupMessage')})
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/secret',
  failureRedirect: '/signup',
  failureFlash: true
}));


router.get('/secret', isLoggedIn, function(req,res, next){
  console.log("****  req.user " + req.user);
  res.render('secret', {user : req.user, updateMessage: req.flash('updateMsg') });

});

router.post('/saveSecretInfo', isLoggedIn, function(req, res, next){

  //Since we are letting the user update one or none or both, need to
  //check that there is a value to update.

  var newData = {};

  if (req.body.favoriteColor != '') {
    newData.favoriteColor = req.body.favoriteColor;
  }
  if (req.body.luckyNumber != '') {
    newData.luckyNumber = req.body.luckyNumber;
  }

  //Update our user wih the new data. ** This is a mongoose function
  req.user.update(newData, function(err) {
    if (err) {
      console.log('error ' + err);
      req.flash('updateMsg', 'Error updating');
    }

    else {
      console.log('updated');
      req.flash('updateMsg', 'Updated data');
    }

    //Redirect back to secret page, which will fetch and show the updated data.
    res.redirect('/secret');

  })

});


function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

/* GET login page */
router.get('/login', function(req, res, next){
  res.render('login', { message : req.flash('loginMessage')})
});


/* POST login - this is called when clicking login button
 Very similar to signup, except using local-login.  */
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/secret',
  failureRedirect: '/login',
  failureFlash: true
}));

  /* GET Logout */
router.get('/logout', function(req, res, next) {
  req.logout();         //passport middleware adds these functions to req.
  res.redirect('/');
});

router.post('/login', passport.authenticate('local-login'));

module.exports = router;
