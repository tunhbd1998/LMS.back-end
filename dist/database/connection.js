"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connDB = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log('env', process.env.DB_HOST);
var connDB = new _sequelize["default"](process.env.DB_NAME, process.env.DB_USER, process.env.PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_TYPE
});
exports.connDB = connDB;