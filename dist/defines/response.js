"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LMSResponse = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LMSResponse = function LMSResponse(error, data) {
  _classCallCheck(this, LMSResponse);

  this.error = error;
  this.data = data;
};

exports.LMSResponse = LMSResponse;