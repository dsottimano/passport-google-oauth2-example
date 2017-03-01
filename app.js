var authConfig = require('./config/auth')
var express = require('express')
var passport = require('passport')
var app = express();
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var authRoutes = require('./routes/auth-routes')
var projectRoutes = require('./routes/project-routes')
var mongoose = require('mongoose')
//the line below has your mongo connection string, create a file and import it as the CONNECTIONSTRING variable
var CONNECTIONSTRING = require('./config/connection')
var connection = mongoose.connection;

 

//here, I'm using handlebars to render some static pages for my login, you don't need to do this
app.set('view engine', 'hbs');


//middleware start
app.use(logger('dev'));
app.use(cookieParser());
app.use(session({
  secret: 'giewiohroiwioeneiwonreio895793639647$^&%*&*@#@',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 52
  }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(authRoutes)
app.use(projectRoutes)
app.use(express.static(__dirname + '/public'));


//middleware end

// Application routes
app.get('/', function (req, res) {
  res.render('index', {
    user: req.user
  });
});

// Establishes MongoDb Connection
mongoose.connect(CONNECTIONSTRING, {
  server: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000
    }
  },
  replset: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000
    }
  }
});

connection.on('error', console.error.bind(console, 'connection error:'));

connection.once('open', function () {
  app.listen(process.env.PORT || 3000, function () {
    console.log("Listening....")
  })
});