"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleNotFound = void 0;

const handleNotFound = (req, res, next) => {
  if (!req.error) {
    return res.status(404).send();
  }

  next();
};

exports.handleNotFound = handleNotFound;