var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');


// My imports
const mongoose = require('mongoose');
require('dotenv').config();

var loginRouter = require('./routes/login');
var scheduleRouter = require('./routes/scheduler');
var empTableRouter = require('./routes/employeeTable');
var storeInviteRouter = require('./routes/invite');
var empSettingsRouter = require('./routes/settings');
var resetPasswordRouter = require('./routes/resetPassword');
var empReqRouter = require('./routes/employeeRequests');

var app = express();

mongoose.connect(process.env.DEV_DB_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('DB Connected'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


// Routes to use
app.use('/', loginRouter);
app.use('/scheduler', scheduleRouter);
app.use('/emp-table', empTableRouter);
app.use('/invite', storeInviteRouter);
app.use('/settings', empSettingsRouter);
app.use('/resetPassword', resetPasswordRouter);
app.use('/employeeRequests', empReqRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log(err);
});

module.exports = app;
