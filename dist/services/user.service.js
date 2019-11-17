"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userService = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database");

var _password = require("../utils/password");

var _lab = require("../database/models/lab.model");

var _fields = require("../utils/fields");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserService {
  findOne(conditions) {
    return new Promise((resolve, reject) => {
      const conn = (0, _database.createConnection)();
      const userModel = (0, _database.getUserModel)(conn);
      conn.authenticate().then(() => {
        userModel.findOne({
          where: conditions,
          attributes: {
            exclude: ['id']
          }
        }).then(user => {
          conn.close();
          resolve(user ? user.dataValues : null);
        }).catch(err => {
          conn.close();
          reject(err);
        });
      }).catch(err => reject(err));
    });
  }

  findMany(conditions) {
    return new Promise((resolve, reject) => {
      const conn = (0, _database.createConnection)();
      const userModel = (0, _database.getUserModel)(conn);
      conn.authenticate().then(() => {
        userModel.findAll({
          where: conditions,
          attributes: {
            exclude: ['id']
          }
        }).then(users => {
          conn.close();
          resolve(users ? users.map(user => user.dataValues) : []);
        }).catch(err => {
          conn.close();
          reject(err);
        });
      }).catch(err => reject(err));
    });
  }

  createOne(data) {
    return new Promise((resolve, reject) => {
      const conn = (0, _database.createConnection)();
      const userModel = (0, _database.getUserModel)(conn);
      conn.authenticate().then(async () => {
        userModel.create({ ...data,
          password: await (0, _password.hashPassword)(data.password)
        }, {}).then(user => {
          conn.close();
          resolve(user.dataValues);
        }).catch(err => {
          conn.close();
          reject(err);
        });
      }).catch(err => reject(err));
    });
  }

  signUpLab(user, lab) {
    return new Promise((resolve, reject) => {
      const conn = (0, _database.createConnection)();
      const userModel = (0, _database.getUserModel)(conn);
      const labModel = (0, _lab.getLabModel)(conn);
      conn.authenticate().then(() => {
        conn.transaction(async t => {
          return userModel.create({ ...user,
            isAccepted: false,
            role: 1,
            password: await (0, _password.hashPassword)(user.password)
          }, {
            transaction: t
          }).then(userRes => {
            return labModel.create({ ...lab,
              id: (0, _fields.generateId)(),
              admin: userRes.dataValues.username
            }, {
              transaction: t
            }).then(labRes => {
              console.log('labRes', labRes);
              return {
                user: labRes.dataValues,
                lab: labRes.dataValues
              };
            });
          });
        }).then(({
          user,
          lab
        }) => {
          conn.close();
          resolve({
            user,
            lab
          });
        }).catch(err => {
          conn.close();
          reject(err);
        });
      }).catch(err => reject(err));
    });
  }

  isExists(username) {
    return new Promise((resolve, reject) => {
      this.findOne({
        username
      }).then(user => {
        resolve(user ? true : false);
      }).catch(err => reject(err));
    });
  }

}

const userService = new UserService();
exports.userService = userService;