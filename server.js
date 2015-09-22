var express = require('express');
var app = express();

// Database
var mongoose = require('mongoose');
var database = require('./lib/mongodb');
mongoose.connect(database.url);

var morgan = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var session = require('express-session');

// Models
var User = require('./models/Users');
var Group = require('./models/Groups')

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// Routes
require('./routes/login')(app);
require('./routes/groups')(app);
require('./routes/register')(app);

app.listen(8080);
console.log("App listening on port 8080");
