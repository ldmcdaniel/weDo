var Group = require('../models/Groups');

module.exports = function (app) {
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
}
