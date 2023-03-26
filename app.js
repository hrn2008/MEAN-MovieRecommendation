const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./controllers/index');
const usersRouter = require('./controllers/users');
//new controller
const recommendations = require('./controllers/recommendations');
const comments=require('./controllers/comments')
const auth=require('./controllers/auth');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//using dotenv
if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}
//MongoDB Connection 
const mongoose=require('mongoose');
mongoose.connect(process.env.CONNECTION_STRING)
.then((res)=> {
  console.log("Connected to MongoDB");
}) .catch(()=>{
  console.log("Connection to MongoDB Failed");
})

//passport
const passport=require('passport');
const session=require('express-session');

app.use(session({
  secret:process.env.PASSPORT_SECRET,
  //make sure session doesnt time out with resave
  resave:true,
  //for first login 
  saveUninitialized:false
}))

app.use(passport.initialize());
app.use(passport.session());

const User=require('./models/user');
passport.use(User.createStrategy());

//write session vars
passport.serializeUser(User.serializeUser());
//read session vars
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

//map all requests
app.use('/recommendations',recommendations);
app.use('/comments',comments);
app.use('/auth',auth);

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
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
