"use strict";

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const createError = require('http-errors');
// const path = require("path");
var express = require("express");

var bodyParser = require("body-parser");

var cookieParser = require("cookie-parser");

var logger = require("morgan");

var indexRouter = require("./routes/index");

var usersRouter = require("./routes/users");

var app = express(); // config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express["static"](_path["default"].join(__dirname, "public")));

var passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy(function (username, password, done) {
  User.findOne({
    username: username
  }, function (err, user) {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false, {
        message: "Incorrect username."
      });
    }

    if (!user.validPassword(password)) {
      return done(null, false, {
        message: "Incorrect password."
      });
    }

    return done(null, user);
  });
})); // view engine setup

app.set("views", _path["default"].join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/", indexRouter);
app.use("/users", usersRouter); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render("error");
});
module.exports = app;