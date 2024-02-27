var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose")

const cors = require("cors")
const jwt = require("jsonwebtoken")
require("dotenv").config()

var todoRouter = require("./routes/todo")
var authRouter = require("./routes/auth")

var app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.DB_URI, {}).then(() => {
  console.log("Database Connected!")
})

app.use((req, res, next) => {
  if (req.url.includes("auth")) {
    next()
  } else {
    try {
      const token = req.headers["authorization"].split(" ")[1]
      var decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.userName) {
        req.user = decoded.userName
        next()
      }
      else {
        res.status(500).json({ "message": "Unauthorized Access" })
      }
    } catch (err) {
      res.status(500).json({ "message": "Unauthorized Access" })
    }
  }
})

app.use(logger(function (tokens, req, res) {
  return [
    'User:', req.user, "|",
    'Type:', tokens.method(req, res), "|",
    'Path: ', tokens.url(req, res), "|",
    "Status:", tokens.status(req, res), "|",
    "Duration:", tokens['response-time'](req, res), 'ms'
  ].join(' ')
}));

app.use("/", todoRouter)
app.use("/auth", authRouter)

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
