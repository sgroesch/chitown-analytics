var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Account = require('../models/Account');
var router = express.Router();

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

router.post('/login', passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  }
);

router.post('/register', function(req, res){
  Account.register(new Account({
    username: req.body.username,
    email: req.body.email
  }),
  req.body.password,
  function(err, account) {
    if (err) {
      return res.render('register', { account: account });
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
