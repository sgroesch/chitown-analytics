var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Models = require('../models/Account');
var router = express.Router();

passport.use(new LocalStrategy(Models.Account.authenticate()));
passport.serializeUser(Models.Account.serializeUser());
passport.deserializeUser(Models.Account.deserializeUser());

router.get('/', function(req, res){
  res.render('loginandregister', { user: req.user});
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  }
);

router.post('/register', function(req, res){
  Models.Account.register(new Models.Account({
    username: req.body.username,
    email: req.body.email
  }),
  req.body.password,
  function(err, account) {
    if (err) {
      return res.render('/', { account: account });
      // message to require registering
    }
    passport.authenticate('local')(req, res, function() {
      res.redirect('/');
    });
  }
  );
})

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


module.exports = router;
