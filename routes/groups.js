var Group = require('../models/Groups');

module.exports = function (app) {
  app.get('/api/myGroups', function(req, res) {
    // use mongoose to get all groups in the database
    Group.find(function(err, groups) {
      // if (err)
        // res.send(err)
      res.json(groups); // return all todos in JSON format
    });
  });

  app.get('/api/myGroups/:group_id', function(req, res) {
    // use mongoose to get all groups in the database
    console.log('look here:', req.params);
    Group.findOne({_id : req.params.group_id}, function(err, groups) {
      console.log(groups);
      res.send(groups);
      // if (err) throw err;
      // res.json(groups); // return all todos in JSON format
    });
  });

  // create group and send back all todos after creation
  app.post('/api/groups', function(req, res) {
    Group.create({
      name : req.body.name,
      done : false
    }, function(err, group) {
      if (err)
        res.send(err);

      // get and return all the groups after you create another
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

      // get and return all the groups after you create another
      Group.find(function(err, groups) {
        if (err)
          res.send(err)
        res.json(groups);
      });
    });
  });
}
