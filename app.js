var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var dotenv = require("dotenv").config();

var auth = require('./auth')
var campsites = require('./routes/campsites');
var index = require('./routes/index');
var users = require('./routes/users');
var location = require('./routes/location')



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/users', users);

app.use('/api/v1/campsites', campsites);
app.use('/auth', auth);
app.use('/location', location);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next){
  // set locals, only providing error in development render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error:req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
