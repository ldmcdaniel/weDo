var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var morgan = require('morgan');
var methodOverride = require('method-override');
var bcrypt = require('bcrypt');
var app = express();
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/weDo');

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

var userSchema = new Schema({
  first: String,
  last: String,
  email: String,
  password: String
})

var User = mongoose.model('User', userSchema);

app.get('/api/users', function(req, res) {

  // use mongoose to get all todos in the database
  User.findOne({ email: req.body.email }, function(err, users) {
    if (users) {
      console.log("It worked  " + users)
    }
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
        res.send(err)

    res.json(users); // return all users in JSON format
  });
});

// register a new user
app.post('/api/users', function(req, res) {
  var user = User.find({email: req.body.email});

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
    });    // create a user, information comes from AJAX request from Angular
    // console.log(hashPass);
    // User.create({
    //   first : req.body.first,
    //   last : req.body.last,
    //   email : req.body.email,
    //   password: req.body.password
    // }, function(err, user) {
    //   if (err)
    //     res.send(err);

    //   // get and return all the todos after you create another
    //   User.find(function(err, users) {
    //     if (err)
    //       res.send(err)
    //     res.json(users);
    //   });
    // });
});

// delete a todo
app.delete('/api/users/:user_id', function(req, res) {
  User.remove({
    _id : req.params.user_id
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

var groupSchema = new Schema({
  name: String
})

var Group = mongoose.model('Group', groupSchema);

// routes ======================================================================

// api ---------------------------------------------------------------------
// get all todos
app.get('/api/groups', function(req, res) {

  // use mongoose to get all todos in the database
  Group.find(function(err, groups) {

    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
        res.send(err)

    res.json(groups); // return all todos in JSON format
  });
});

// create todo and send back all todos after creation
app.post('/api/groups', function(req, res) {
  console.log(req.body);
  // create a todo, information comes from AJAX request from Angular
  Group.create({
    name : req.body.name,
    done : false
  }, function(err, group) {
    if (err)
      res.send(err);

    // get and return all the todos after you create another
    Group.find(function(err, groups) {
      if (err)
        res.send(err)
      res.json(groups);
    });
  });
});

// delete a todo
app.delete('/api/groups/:group_id', function(req, res) {
  Group.remove({
    _id : req.params.group_id
  }, function(err, group) {
    if (err)
        res.send(err);

    // get and return all the todos after you create another
    Group.find(function(err, groups) {
      if (err)
        res.send(err)
      res.json(groups);
    });
  });
});

app.listen(8080);
console.log("App listening on port 8080");
