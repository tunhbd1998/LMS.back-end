"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createConnection = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createConnection = () => {
  const dbName = process.env.TEST_SYNC_DB ? _config.TEST_DATABASE.DB_NAME : _config.DATABASE.DB_NAME;
  const dbUser = process.env.TEST_SYNC_DB ? _config.TEST_DATABASE.USER : _config.DATABASE.USER;
  const dbPass = process.env.TEST_SYNC_DB ? _config.TEST_DATABASE.PASS : _config.DATABASE.PASS;
  const dbHost = process.env.TEST_SYNC_DB ? _config.TEST_DATABASE.HOST : _config.DATABASE.HOST;
  return new _sequelize.default(dbName, dbUser, dbPass, {
    host: dbHost,
    dialect: _config.DATABASE.TYPE
  });
};

exports.createConnection = createConnection;