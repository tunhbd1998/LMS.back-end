"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userService = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _lodash = require("lodash");

var _database = require("../database");

var _password = require("../utils/password");

var _lab = require("../database/models/lab.model");

var _fields = require("../utils/fields");

var _base = require("./base.service");

var _constants = require("../defines/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserService {
  findOne({
    conditions,
    fields
  }) {
    return new Promise((resolve, reject) => {
      const conn = (0, _database.createConnection)();
      const UserModel = (0, _database.getUserModel)(conn);
      conn.authenticate().then(() => {
        _base.baseService.findOne(UserModel, {
          conditions,
          fields
        }).then(user => {
          conn.close();
          resolve(user);
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
        conditions: {
          username
        },
        fields: ['username']
      }).then(user => {
        resolve(user ? true : false);
      }).catch(err => reject(err));
    });
  }

  findMany({
    conditions,
    fields,
    limit,
    offset,
    order
  }) {
    return new Promise((resolve, reject) => {
      const conn = (0, _database.createConnection)();
      const UserModel = (0, _database.getUserModel)(conn);
      conn.authenticate().then(() => {
        _base.baseService.findMany(UserModel, {
          conditions,
          fields,
          limit,
          offset,
          order
        }).then(users => {
          conn.close();
          resolve(users);
        }).catch(err => {
          conn.close();
          reject(err);
        });
      }).catch(err => reject(err));
    });
  }

  async getProfile(username) {
    return this.findOne({
      conditions: {
        username
      },
      fields: _constants.REQUIRE_USER_GET_PROFILE_FIELDS
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

  updateOne(username, data = {}) {
    return new Promise((resolve, reject) => {
      const conn = (0, _database.createConnection)();
      const userModel = (0, _database.getUserModel)(conn);
      conn.authenticate().then(async () => {
        userModel.update({ ...data,
          password: data.password ? (0, _password.hashPassword)(data.password) : undefined
        }, {
          where: {
            username
          },
          fields: (0, _lodash.keys)(data)
        }).then(async res => {
          conn.close();
          const user = await this.getProfile(username);
          resolve(user);
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
      const UserModel = (0, _database.getUserModel)(conn);
      const LabModel = (0, _lab.getLabModel)(conn);
      conn.authenticate().then(() => {
        conn.transaction(async t => {
          return UserModel.create({ ...user,
            isAccepted: false,
            role: 1,
            password: await (0, _password.hashPassword)(user.password)
          }, {
            transaction: t
          }).then(userRes => {
            return LabModel.create({ ...lab,
              id: (0, _fields.generateId)(),
              admin: userRes.dataValues.username
            }, {
              transaction: t
            }).then(labRes => {
              // console.log('labRes', labRes);
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

}

const userService = new UserService();
exports.userService = userService;