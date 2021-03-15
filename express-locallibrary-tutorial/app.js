
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { Sequelize } = require('sequelize');// for postgress
const bodyParser = require('body-parser');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog');  //Import routes for "catalog" area of site
var compression = require('compression');
var helmet = require('helmet');


var app = express();
app.locals.moment = require('moment');

app.use(compression()); //Compress all routes
app.use(helmet());

//set up mangoose coonection
var mongoose = require('mongoose');
var mongoDB = process.env.MANGO_CONNECT;
mongoose.connect(mongoDB,{useNewUrlParser: true, useUnifiedTopology:true});
var db = mongoose.connection;
db.on('error',console.error.bind(console, 'MangoDB coonection error'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);  // Add catalog routes to middleware chain.


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
// Catches 404 and forward to error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
