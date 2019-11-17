"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LMSResponse = void 0;

class LMSResponse {
  constructor(error, data) {
    this.error = error;
    this.data = data;
  }

}

exports.LMSResponse = LMSResponse;