var User = require('../models/Users')
var bcrypt = require('bcrypt');

module.exports = function (app) {
  app.post('/api/login', function(req, res) {
      User.findOne({ email: req.body.email },
        function(err, user) {
          if (err) throw err

          if (user) {
            bcrypt.compare(req.body.password, user.password, function (err, match) {
              if (match) {
                res.send(user._id);
                // res.redirect('http://localhost:8100/#/app/')
              } else {
                res.status(401).send({err: 'Password does not match'});
              }
            })
            // do login
            // bcrypt.compare()
            //res.session
            // console.log("It worked  " + user.password)
            // res.send(user)
          } else {
            res.status(401).send({err: 'User not found'});
          }

      });
  });
}
