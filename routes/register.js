var User = require('../models/Users');
var bcrypt = require('bcrypt');

module.exports = function (app) {
  app.post('/api/register', function(req, res) {
    bcrypt.hash(req.body.password, 8, function(err, hash) {
      // console.log(hash);
      User.create({
        first : req.body.first,
        last : req.body.last,
        email : req.body.email,
        password: hash
      }, function(err, user) {
        if (err)
          res.send(err);

        // get and return all the todos after you create another
        User.find(function(err, users) {
          if (err)
            res.send(err)
          res.json(users);
        });
      });
    });
  });
}

