"use strict";

var passport = require("passport");

var _require = require("./strategies"),
    useLocalStrategy = _require.useLocalStrategy,
    useJwtStrategy = _require.useJwtStrategy,
    useFacebookStrategy = _require.useFacebookStrategy,
    useGoogleStrategy = _require.useGoogleStrategy;

var configPassport = function configPassport(app) {
  app.use(passport.initialize());
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });
  useLocalStrategy();
  useJwtStrategy();
  useFacebookStrategy();
  useGoogleStrategy();
};