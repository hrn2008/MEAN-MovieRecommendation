const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./controllers/index');
const usersRouter = require('./controllers/users');
//new controller
const recommendations = require('./controllers/recommendations');
const comments = require('./controllers/comments')
const auth = require('./controllers/auth');
const bestMovies = require('./controllers/bestMovies');

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
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_STRING)
  .then((res) => {
    console.log("Connected to MongoDB");
  }).catch(() => {
    console.log("Connection to MongoDB Failed");
  })

//passport
const passport = require('passport');
const session = require('express-session');

app.use(session({
  secret: process.env.PASSPORT_SECRET,
  //make sure session doesnt time out with resave
  resave: true,
  //for first login 
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

const User = require('./models/user');
const { map } = require('jquery');
passport.use(User.createStrategy());

//write session vars
passport.serializeUser(User.serializeUser());
//read session vars
passport.deserializeUser(User.deserializeUser());

//google auth strategy
// const googleStrategy = require('passport-google-oauth20').Strategy;
//authenticate google app web/api keys
const googleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new googleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async function (accessToken, refreshToken, profile, done) {
  try {
    console.log(profile);
    // Find or create user in your database
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      // Create new user in database
      const username = Array.isArray(profile.emails) && profile.emails.length > 0 ? profile.emails[0].value.split('@')[0] : '';
      const newUser = new User({
        username: profile.displayName,
        googleId: profile.id
      });
      user = await newUser.save();
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}
));



app.use('/', indexRouter);
app.use('/users', usersRouter);

//map all requests
app.use('/recommendations', recommendations);
app.use('/comments', comments);
app.use('/auth', auth);
app.use('/bestmovies', bestMovies); 
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// // error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
