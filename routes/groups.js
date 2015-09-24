var Group = require('../models/Groups');

module.exports = function (app) {
  app.get('/api/myGroups', function(req, res) {
    console.log(req.session.user_id)
    Group.find({_id : req.session.user_id}, function(err, groups) {
      if (err) throw err;
      res.json(groups);
    });
  });

  app.get('/api/myGroups/:group_id', function(req, res) {
    Group.findOne({_id : req.params.group_id}, function(err, groups) {
      res.send(groups);
      if (err) throw err;
    });
  });

  // create group and send back all todos after creation
  app.post('/api/groups', function(req, res) {
    console.log(req.body);
    Group.create({
      name : req.body.name
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
