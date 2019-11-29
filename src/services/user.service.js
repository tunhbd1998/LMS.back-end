import sequelize from 'sequelize';
import { keys } from 'lodash';
import { createConnection, getUserModel } from '../database';
import { hashPassword } from '../utils/password';
import { getLabModel } from '../database/models/lab.model';
import { generateId } from '../utils/fields';
import { baseService } from './base.service';
import { REQUIRE_USER_GET_PROFILE_FIELDS } from '../defines/constants';
import { getLabAddressModel } from '../database/models/lab-address.model';

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

  async getProfile(username) {
    return this.findOne({
      conditions: { username },
      fields: REQUIRE_USER_GET_PROFILE_FIELDS
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

  updateOne(username, data = {}) {
    return new Promise((resolve, reject) => {
      const conn = createConnection();
      const userModel = getUserModel(conn);

      conn
        .authenticate()
        .then(async () => {
          userModel
            .update(
              {
                ...data,
                password: data.password
                  ? hashPassword(data.password)
                  : undefined
              },
              {
                where: {
                  username
                },
                fields: keys(data)
              }
            )
            .then(async res => {
              conn.close();
              const user = await this.getProfile(username);
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

  signUpLab(user, lab) {
    return new Promise((resolve, reject) => {
      const conn = createConnection();
      const LabAddressModel = getLabAddressModel(conn);
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
                  password: await hashPassword(user.password)
                },
                { transaction: t }
              ).then(userRes => {
                return LabAddressModel.create(
                  {
                    labId: generateId(),
                    province: lab.address.province || null,
                    detail: lab.address.detail || null
                  },
                  { transaction: t }
                ).then(labAddressRes => {
                  return LabModel.create(
                    {
                      ...lab,
                      address: labAddressRes.dataValues.labId,
                      id: labAddressRes.dataValues.labId,
                      admin: userRes.dataValues.username
                    },
                    { transaction: t }
                  ).then(labRes => {
                    // console.log('labRes', labRes);
                    return {
                      user: labRes.dataValues,
                      lab: labRes.dataValues
                    };
                  });
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
}

export const userService = new UserService();
