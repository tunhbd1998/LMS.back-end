"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createConnection = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createConnection = () => {
  return new _sequelize.default(_config.DATABASE.DB_NAME, _config.DATABASE.USER, _config.DATABASE.PASS, {
    host: _config.DATABASE.HOST,
    dialect: _config.DATABASE.TYPE
  });
};

exports.createConnection = createConnection;