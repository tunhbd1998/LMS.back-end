"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userModel = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _connection = require("../connection");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userModel = _connection.connDB.define('user', {
  username: {
    type: _sequelize["default"].STRING
  },
  password: {
    type: _sequelize["default"].STRING
  },
  avatarImage: {
    type: _sequelize["default"].STRING
  },
  fullname: {
    type: _sequelize["default"].TEXT
  },
  phone: {
    type: _sequelize["default"].STRING
  },
  email: {
    type: _sequelize["default"].STRING
  },
  IDCardNumber: {
    type: _sequelize["default"].STRING
  },
  university: {
    type: _sequelize["default"].TEXT
  },
  IDNumber: {
    type: _sequelize["default"].STRING
  },
  role: {
    type: _sequelize["default"].TINYINT,
    defaultValue: 0
  },
  isTeacher: {
    type: _sequelize["default"].BOOLEAN
  },
  labId: {
    type: _sequelize["default"].STRING
  }
}, {});

exports.userModel = userModel;