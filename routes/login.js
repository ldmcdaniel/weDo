var User = require('../models/Users'),
    // bcrypt = require('bcrypt'),
    passport = require('passport');;

module.exports = function (app) {
  app.post('/api/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        return res.status(500).json({err: err});
      }
      if (!user) {
        return res.status(401).json({err: info});
      }
      req.logIn(user, function(err) {
        if (err) {
          return res.status(500).json({err: 'Could not log in user'});
        }
        res.status(200).json({status: 'Login successful!'});
      });
    })(req, res, next);
  });

  app.get('/api/logout', function(req, res) {
    req.logout();
    res.status(200).json({status: 'Bye!'});
  });

  // app.post('/api/login', function(req, res) {
  //     User.findOne({ email: req.body.email },
  //       function(err, user) {
  //         if (err) throw err

  //         if (user) {
  //           bcrypt.compare(req.body.password, user.password, function (err, match) {
  //             if (match) {
  //               res.send(user._id);
  //               // res.redirect('http://localhost:8100/#/app/')
  //             } else {
  //               res.status(401).send({err: 'Password does not match'});
  //             }
  //           })
  //           // do login
  //           // bcrypt.compare()
  //           //res.session
  //           // console.log("It worked  " + user.password)
  //           // res.send(user)
  //         } else {
  //           res.status(401).send({err: 'User not found'});
  //         }
  //     });
  // });
}
