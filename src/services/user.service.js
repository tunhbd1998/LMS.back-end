import { keys } from 'lodash';
import { BaseService } from './base.service';
import {
  REQUIRE_USER_GET_PROFILE_FIELDS,
  REQUIRE_USER_UPDATE_PROFILE_FIELDS
} from '../defines/constants';
import { UserModel } from '../database/models/user.model';
import { hashPassword } from '../utils/password';

class UserService extends BaseService {
  constructor() {
    super(UserModel);
  }

  async getProfile(username) {
    return this.findOne({
      where: { username },
      attributes: REQUIRE_USER_GET_PROFILE_FIELDS
    });
  }

  async addUser(userData) {
    return this.createOne({
      ...userData,
      password: await hashPassword(userData.password)
    });
  }

  async updateProfile(username, data) {
    await this.updateOne(data, {
      where: { username },
      fields: keys(data)
    });

    return this.getProfile(username);
  }
}

export const userService = new UserService();
