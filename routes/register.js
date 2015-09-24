var User = require('../models/Users'),
    bcrypt = require('bcrypt'),
    passport = require('passport');

module.exports = function (app) {
  app.post('/api/register', function(req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function(err, account) {
      if (err) {
        return res.status(500).json({err: err});
      }
      passport.authenticate('local')(req, res, function () {
        return res.status(200).json({status: 'Registration successful!'});
      });
    });
  });
}

