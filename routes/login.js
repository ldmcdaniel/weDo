var User = require('../models/Users')

module.exports = function (app) {
  app.get('/api/login', function(req, res) {
    console.log(req.body);
    // use mongoose to get all todos in the database
    User.findOne({ email: req.body.email },
      function(err, users) {

      if (users) {
        console.log("It worked  " + users)
      }
      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err)
          res.send(err)

      res.json(users); // return all users in JSON format
    });
  });
}

// var user = User.find({email: req.body.email});

 //     if (user) {
 //    // do login
 //    //bcrypt.compare()
 //    //res.session
 // } else {
 //    // do register
 //    bcrypt.hash(req.body.password, 8, function(err, hash) {
 //      // console.log(hash);
 //      User.create({
 //        first : req.body.first,
 //        last : req.body.last,
 //        email : req.body.email,
 //        password: hash
 //      }, function(err, user) {
 //        if (err)
 //          res.send(err);

 //        // get and return all the todos after you create another
 //        User.find(function(err, users) {
 //          if (err)
 //            res.send(err)
 //          res.json(users);
 //        });
 //      });
 //    });
