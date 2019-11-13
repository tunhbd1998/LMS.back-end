"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userService = void 0;

var _database = require("../database");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserService =
/*#__PURE__*/
function () {
  function UserService() {
    _classCallCheck(this, UserService);

    this.connDB = _database.connDB;
    this.userModel = _database.userModel;
  }

  _createClass(UserService, [{
    key: "findOne",
    value: function findOne(condition) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.connDB.authenticate().then(function () {
          _this.userModel.findOne(condition).then(function (user) {
            _this.connDB.close();

            resolve(user);
          })["catch"](function (err) {
            _this.connDB.close();

            reject(err);
          });
        })["catch"](function (err) {
          return reject(err);
        });
      });
    }
  }, {
    key: "findMany",
    value: function findMany(conditions) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.connDB.authenticate().then(function () {
          _this2.userModel.findAll(conditions).then(function (users) {
            _this2.connDB.close();

            resolve(users);
          })["catch"](function (err) {
            _this2.connDB.close();

            reject(err);
          });
        })["catch"](function (err) {
          return reject(err);
        });
      });
    }
  }]);

  return UserService;
}();

var userService = new UserService();
exports.userService = userService;