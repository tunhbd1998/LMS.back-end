"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LMSError = void 0;

class LMSError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

}

exports.LMSError = LMSError;