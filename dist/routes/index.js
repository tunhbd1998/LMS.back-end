"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "homeRouter", {
  enumerable: true,
  get: function () {
    return _home.homeRouter;
  }
});
Object.defineProperty(exports, "handleNotFound", {
  enumerable: true,
  get: function () {
    return _notFound.handleNotFound;
  }
});
Object.defineProperty(exports, "handleError", {
  enumerable: true,
  get: function () {
    return _error.handleError;
  }
});
Object.defineProperty(exports, "userRouter", {
  enumerable: true,
  get: function () {
    return _users.userRouter;
  }
});
Object.defineProperty(exports, "labRouter", {
  enumerable: true,
  get: function () {
    return _labs.labRouter;
  }
});

var _home = require("./home");

var _notFound = require("./not-found");

var _error = require("./error");

var _users = require("./users");

var _labs = require("./labs");