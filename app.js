const createError = require('http-errors');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const cookieParser = require('cookie-parser');
// const logger = require("morgan");
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const mongoStore = require('connect-mongodb-session')(session);
const compression = require('compression');
const helmet = require('helmet');
// const mongoStore = require("connect-mongo");

// Passport config
require('./config/passport')(passport);
// Dotenv config
require('dotenv').config();

// Routes
const indexRouter = require('./routes/index');
const vaultRouter = require('./routes/vault');

// Constants
const MongoURI = process.env.MONGOURL;
const ExpressSessionSecret = process.env.EXPRESS_SESSION_SECRET;

const app = express();
app.use(helmet());

// DB config
const connectDB = require('./config/db');
// Connects MongoDB
connectDB();

// connect-mongodb-session
const sessionStore = new mongoStore({
  uri: MongoURI,
  collection: 'sessions',
  expires: 1000 * 60 * 60, // 1hr in milli sec
});

// Catch errors
sessionStore.on('error', function (error) {
  console.log(error);
});

// View engine setup
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Express session
app.use(
  session({
    secret: ExpressSessionSecret,
    resave: true,
    saveUninitialized: true,
    store: sessionStore, // for connect-mongodb-session
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

// Must be after express session
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.successMsg = req.flash('successMsg');
  res.locals.errorMsg = req.flash('errorMsg');
  res.locals.error = req.flash('error');
  next();
});

app.use(compression()); // Compress all routes
// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Use static page
// // bootstrap
app.use(
  '/bootstrap/css',
  express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css'))
);
app.use(
  '/bootstrap/js',
  express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js'))
);
// // custom
app.use('/img', express.static(path.join(__dirname, '/public/images')));
app.use('/css', express.static(path.join(__dirname, '/public/stylesheets')));
app.use('/js', express.static(path.join(__dirname, '/public/javascripts')));

app.use('/', indexRouter);
app.use('/vault', vaultRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
