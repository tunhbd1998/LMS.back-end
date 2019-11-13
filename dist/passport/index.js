"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPassport = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _strategies = require("./strategies");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var configPassport = function configPassport(app) {
  app.use(_passport["default"].initialize());

  _passport["default"].serializeUser(function (user, done) {
    done(null, user);
  });

  _passport["default"].deserializeUser(function (obj, done) {
    done(null, obj);
  });

  (0, _strategies.useLocalStrategy)();
  (0, _strategies.useJwtStrategy)();
};

exports.configPassport = configPassport;