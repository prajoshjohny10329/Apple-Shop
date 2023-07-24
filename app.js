const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload')
const dotenv =  require('dotenv')
dotenv.config();


const UsersRouter = require('./routes/user');
const AdminRouter = require('./routes/admin');

const app = express();

const db = require("./config/connection")
const session = require("express-session")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret:"Key",cookie:{maxAge:600000000}}))
app.use(fileUpload({
  useTempFiles : true
}))

db.connect((err)=>{
  if (err) console.log('error from database'+err);
  else console.log("data base connected");
  
}) 

app.use('/', UsersRouter);
app.use('/admin', AdminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('hi create error');
  // res.redirect('/error')
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log(err);
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
