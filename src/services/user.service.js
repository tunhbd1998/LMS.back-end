import sequelize from 'sequelize';
import { createConnection, getUserModel } from '../database';
import { hashPassword } from '../utils/password';
import { getLabModel } from '../database/models/lab.model';
import { generateId } from '../utils/fields';
import { baseService } from './base.service';

class UserService {
  findOne({ conditions, fields }) {
    return new Promise((resolve, reject) => {
      const conn = createConnection();
      const UserModel = getUserModel(conn);

      conn
        .authenticate()
        .then(() => {
          baseService
            .findOne(UserModel, { conditions, fields })
            .then(user => {
              conn.close();
              resolve(user);
            })
            .catch(err => {
              conn.close();
              reject(err);
            });
        })
        .catch(err => reject(err));
    });
  }
  getProfile(username) {
    return new Promise((resolve,reject) => {
      this.findOne({ conditions: {username} , fields : [] })
        .then(user => {
          resolve(user.dataValues);
        })
        .catch(err => reject(err));
    });
  }

  isExists(username) {
    return new Promise((resolve, reject) => {
      this.findOne({ conditions: { username }, fields: ['username'] })
        .then(user => {
          resolve(user ? true : false);
        })
        .catch(err => reject(err));
    });
  }


  findMany({ conditions, fields, limit, offset, order }) {
    return new Promise((resolve, reject) => {
      const conn = createConnection();
      const UserModel = getUserModel(conn);

      conn
        .authenticate()
        .then(() => {
          baseService
            .findMany(UserModel, { conditions, fields, limit, offset, order })
            .then(users => {
              conn.close();
              resolve(users);
            })
            .catch(err => {
              conn.close();
              reject(err);
            });
        })
        .catch(err => reject(err));
    });
  }

  // findOne(conditions) {
  //   return new Promise((resolve, reject) => {
  //     const conn = createConnection();
  //     const userModel = getUserModel(conn);

  //     conn
  //       .authenticate()
  //       .then(() => {
  //         userModel
  //           .findOne({
  //             where: conditions,
  //             attributes: {
  //               exclude: ['id'],
  //             },
  //           })
  //           .then(user => {
  //             conn.close();
  //             resolve(user ? user.dataValues : null);
  //           })
  //           .catch(err => {
  //             conn.close();
  //             reject(err);
  //           });
  //       })
  //       .catch(err => reject(err));
  //   });
  // }

  // findMany(conditions) {
  //   return new Promise((resolve, reject) => {
  //     const conn = createConnection();
  //     const userModel = getUserModel(conn);

  //     conn
  //       .authenticate()
  //       .then(() => {
  //         userModel
  //           .findAll({
  //             where: conditions,
  //             attributes: {
  //               exclude: ['id'],
  //             },
  //           })
  //           .then(users => {
  //             conn.close();
  //             resolve(users ? users.map(user => user.dataValues) : []);
  //           })
  //           .catch(err => {
  //             conn.close();
  //             reject(err);
  //           });
  //       })
  //       .catch(err => reject(err));
  //   });
  // }

  createOne(data) {
    return new Promise((resolve, reject) => {
      const conn = createConnection();
      const userModel = getUserModel(conn);

      conn
        .authenticate()
        .then(async () => {
          userModel
            .create(
              { ...data, password: await hashPassword(data.password) },
              {}
            )
            .then(user => {
              conn.close();
              resolve(user.dataValues);
            })
            .catch(err => {
              conn.close();
              reject(err);
            });
        })
        .catch(err => reject(err));
    });
  }
  update(data) {
    return new Promise((resolve, reject) => {
      const conn = createConnection();
      const userModel = getUserModel(conn);

      conn
        .authenticate()
        .then(async () => {
          userModel
            .update(
              { ...data },
              {}
            )
            .then(user => {
              conn.close();
              resolve(user.dataValues);
            })
            .catch(err => {
              conn.close();
              reject(err);
            });
        })
        .catch(err => reject(err));
    });
  }

  signUpLab(user, lab) {
    return new Promise((resolve, reject) => {
      const conn = createConnection();
      const UserModel = getUserModel(conn);
      const LabModel = getLabModel(conn);

      conn
        .authenticate()
        .then(() => {
          conn
            .transaction(async t => {
              return UserModel.create(
                {
                  ...user,
                  isAccepted: false,
                  role: 1,
                  password: await hashPassword(user.password),
                },
                { transaction: t }
              ).then(userRes => {
                return LabModel.create(
                  {
                    ...lab,
                    id: generateId(),
                    admin: userRes.dataValues.username,
                  },
                  { transaction: t }
                ).then(labRes => {
                  // console.log('labRes', labRes);
                  return {
                    user: labRes.dataValues,
                    lab: labRes.dataValues,
                  };
                });
              });
            })
            .then(({ user, lab }) => {
              conn.close();
              resolve({ user, lab });
            })
            .catch(err => {
              conn.close();
              reject(err);
            });
        })
        .catch(err => reject(err));
    });
  }

  isExists(username) {
    return new Promise((resolve, reject) => {
      this.findOne({ conditions: { username }, fields: ['username'] })
        .then(user => {
          resolve(user ? true : false);
        })
        .catch(err => reject(err));
    });
  }
}

export const userService = new UserService();