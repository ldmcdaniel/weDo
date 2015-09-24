var express = require('express'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    hash = require('bcrypt-nodejs'),
    path = require('path'),
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy;
    app = express(),
    database = require('./lib/mongodb'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    User = require('./models/Users'),
    Group = require('./models/Groups');

mongoose.connect(database.url);

// app.use(express.static(path.join(__dirname, '../client')));
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'false'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                      // parse application/json
app.use(cookieParser());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride());

// configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
require('./routes/login')(app);
require('./routes/register')(app);

// app.use(function requireAuth (req, res, next) {
//   if (req.session.user) {
//     next();
//   } else {
//     res.status(403).send('Unauthorized!');  }
// })

require('./routes/groups')(app);


app.listen(8080);
console.log("App listening on port 8080");

module.exports = app;
