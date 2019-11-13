import sequelize from 'sequelize';
import { createConnection, getUserModel } from '../database';
import { hashPassword } from '../utils/password';
import { getLabModel } from '../database/models/lab.model';
import { generateId } from '../utils/fields';

class UserService {
  findOne(conditions) {
    return new Promise((resolve, reject) => {
      const conn = createConnection();
      const userModel = getUserModel(conn);

      conn
        .authenticate()
        .then(() => {
          userModel
            .findOne({
              where: conditions,
              attributes: {
                exclude: ['id']
              }
            })
            .then(user => {
              conn.close();
              resolve(user ? user.dataValues : null);
            })
            .catch(err => {
              conn.close();
              reject(err);
            });
        })
        .catch(err => reject(err));
    });
  }

  findMany(conditions) {
    return new Promise((resolve, reject) => {
      const conn = createConnection();
      const userModel = getUserModel(conn);

      conn
        .authenticate()
        .then(() => {
          userModel
            .findAll({
              where: conditions,
              attributes: {
                exclude: ['id']
              }
            })
            .then(users => {
              conn.close();
              resolve(users ? users.map(user => user.dataValues) : []);
            })
            .catch(err => {
              conn.close();
              reject(err);
            });
        })
        .catch(err => reject(err));
    });
  }

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

  signUpLab(user, lab) {
    return new Promise((resolve, reject) => {
      const conn = createConnection();
      const userModel = getUserModel(conn);
      const labModel = getLabModel(conn);

      conn
        .authenticate()
        .then(() => {
          conn
            .transaction(async t => {
              return userModel
                .create(
                  {
                    ...user,
                    isAccepted: false,
                    role: 1,
                    password: await hashPassword(user.password)
                  },
                  { transaction: t }
                )
                .then(userRes => {
                  return labModel
                    .create(
                      {
                        ...lab,
                        id: generateId(),
                        admin: userRes.dataValues.username
                      },
                      { transaction: t }
                    )
                    .then(labRes => {
                      console.log('labRes', labRes);
                      return {
                        user: labRes.dataValues,
                        lab: labRes.dataValues
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
      this.findOne({ username })
        .then(user => {
          resolve(user ? true : false);
        })
        .catch(err => reject(err));
    });
  }
}

export const userService = new UserService();
